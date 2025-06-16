package store

import (
	"encoding/json"
	"os"
	"time"
)

func NowPlusSeconds(seconds int) time.Time {
	return time.Now().Add(time.Duration(seconds) * time.Second)
}

type Snapshot struct {
	Data   map[string]string            `json:"data"`
	Hashes map[string]map[string]string `json:"hashes"`
}

var Data = make(map[string]string)
var Hashes = make(map[string]map[string]string)
var TTL = make(map[string]time.Time)

func SaveToFile(filename string) error {
	snapshot := Snapshot{
		Data:   Data,
		Hashes: Hashes,
	}
	bytes, err := json.MarshalIndent(snapshot, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(filename, bytes, 0644)
}

func LoadFromFile(filename string) error {
	bytes, err := os.ReadFile(filename)
	if err != nil {
		return err
	}
	var snapshot Snapshot
	err = json.Unmarshal(bytes, &snapshot)
	if err != nil {
		return err
	}

	Data = snapshot.Data
	Hashes = snapshot.Hashes
	return nil
}
func IsExpired(key string) bool {
	expiry, exists := TTL[key]
	if !exists {
		return false
	}
	if time.Now().After(expiry) {
		delete(Data, key)
		delete(TTL, key)
		return true
	}
	return false
}
