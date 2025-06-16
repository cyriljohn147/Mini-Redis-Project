package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"redis/store"
	"strings"
)

func RegisterRoutes() {
	http.HandleFunc("/keys", handleListKeys)
	http.HandleFunc("/key/", handleKey)
	http.HandleFunc("/set", handleSet)
	http.HandleFunc("/hset", handleHSet)
	http.HandleFunc("/save", handleSave)
}

func handleListKeys(w http.ResponseWriter, r *http.Request) {
	keys := make([]string, 0)

	for k := range store.Data {
		keys = append(keys, k)
	}
	for k := range store.Hashes {
		keys = append(keys, k)
	}

	json.NewEncoder(w).Encode(keys)
}

func handleKey(w http.ResponseWriter, r *http.Request) {
	key := strings.TrimPrefix(r.URL.Path, "/key/")

	switch r.Method {
	case http.MethodGet:
		if store.IsExpired(key) {
			http.Error(w, "Key expired or not found", http.StatusNotFound)
			return
		}

		if val, ok := store.Data[key]; ok {
			json.NewEncoder(w).Encode(map[string]string{
				"type":  "string",
				"value": val,
			})
			return
		}

		if fields, ok := store.Hashes[key]; ok {
			json.NewEncoder(w).Encode(map[string]interface{}{
				"type":   "hash",
				"fields": fields,
			})
			return
		}

		http.Error(w, "Key not found", http.StatusNotFound)

	case http.MethodDelete:
		deleted := false

		if _, exists := store.Data[key]; exists {
			delete(store.Data, key)
			deleted = true
		}
		if _, exists := store.Hashes[key]; exists {
			delete(store.Hashes, key)
			deleted = true
		}
		delete(store.TTL, key)

		if deleted {
			w.WriteHeader(http.StatusOK)
			fmt.Fprint(w, "Deleted")
		} else {
			http.Error(w, "Key not found", http.StatusNotFound)
		}

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleSet(w http.ResponseWriter, r *http.Request) {
	type request struct {
		Key   string `json:"key"`
		Value string `json:"value"`
		TTL   int    `json:"ttl,omitempty"`
	}

	var req request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	store.Data[req.Key] = req.Value

	if req.TTL > 0 {
		store.TTL[req.Key] = store.NowPlusSeconds(req.TTL)
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "OK")
}

func handleHSet(w http.ResponseWriter, r *http.Request) {
	type request struct {
		Key    string            `json:"key"`
		Fields map[string]string `json:"fields"`
	}

	var req request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if _, ok := store.Hashes[req.Key]; !ok {
		store.Hashes[req.Key] = make(map[string]string)
	}
	for field, value := range req.Fields {
		store.Hashes[req.Key][field] = value
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "OK")
}

func handleDeleteKey(w http.ResponseWriter, r *http.Request) {
	key := strings.TrimPrefix(r.URL.Path, "/key/")

	deleted := false

	if _, exists := store.Data[key]; exists {
		delete(store.Data, key)
		deleted = true
	}

	if _, exists := store.Hashes[key]; exists {
		delete(store.Hashes, key)
		deleted = true
	}

	delete(store.TTL, key)

	if deleted {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "Deleted")
	} else {
		http.Error(w, "Key not found", http.StatusNotFound)
	}
}

func handleSave(w http.ResponseWriter, r *http.Request) {
	err := store.SaveToFile("dump.json")
	if err != nil {
		http.Error(w, "SAVE failed", http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, "OK")
}
