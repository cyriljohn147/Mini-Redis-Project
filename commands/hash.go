package commands

import (
	"redis/store"
)

func HandleHashCommand(cmd string, parts []string, println func(...any)) {
	switch cmd {
	case "HSET":
		if len(parts) < 4 && len(parts)%2 != 0 {
			println("Usage: HSET key field value")
			return
		}
		key := parts[1]

		if _, exists := store.Hashes[key]; !exists {
			store.Hashes[key] = make(map[string]string)
		}

		for i := 2; i < len(parts)-1; i += 2 {
			field := parts[i]
			value := parts[i+1]
			store.Hashes[key][field] = value
		}
		println("OK")

	case "HGET":
		if len(parts) < 3 {
			println("Usage: HGET key field")
			return
		}
		key := parts[1]
		field := parts[2]
		if hash, exists := store.Hashes[key]; exists {
			if val, ok := hash[field]; ok {
				println(val)
			} else {
				println("(nil)")
			}
		} else {
			println("(nil)")
		}

	case "HDEL":
		if len(parts) < 3 {
			println("Usage: HDEL key field")
			return
		}
		key := parts[1]
		field := parts[2]
		if hash, exists := store.Hashes[key]; exists {
			if _, ok := hash[field]; ok {
				delete(hash, field)
				println("(1)")
			} else {
				println("(0)")
			}
		} else {
			println("(0)")
		}
	}
}
