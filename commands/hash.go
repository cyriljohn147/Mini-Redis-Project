package commands

import (
	"fmt"
	"redis/store"
)

func HandleHashCommand(cmd string, parts []string) {
	switch cmd {
	case "HSET":
		if len(parts) < 4 {
			fmt.Println("Usage: HSET key field value")
			return
		}
		key := parts[1]
		field := parts[2]
		value := parts[3]
		if _, exists := store.Hashes[key]; !exists {
			store.Hashes[key] = make(map[string]string)
		}
		store.Hashes[key][field] = value
		fmt.Println("OK")

	case "HGET":
		if len(parts) < 3 {
			fmt.Println("Usage: HGET key field")
			return
		}
		key := parts[1]
		field := parts[2]
		if hash, exists := store.Hashes[key]; exists {
			if val, ok := hash[field]; ok {
				fmt.Println(val)
			} else {
				fmt.Println("(nil)")
			}
		} else {
			fmt.Println("(nil)")
		}

	case "HDEL":
		if len(parts) < 3 {
			fmt.Println("Usage: HDEL key field")
			return
		}
		key := parts[1]
		field := parts[2]
		if hash, exists := store.Hashes[key]; exists {
			if _, ok := hash[field]; ok {
				delete(hash, field)
				fmt.Println("(1)")
			} else {
				fmt.Println("(0)")
			}
		} else {
			fmt.Println("(0)")
		}
	}
}
