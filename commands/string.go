package commands

import (
	"redis/store"
	"strconv"
	"strings"
	"time"
)

func HandleStringCommand(cmd string, parts []string, println func(...any)) {
	switch cmd {
	case "SET":
		if len(parts) < 3 {
			println("Usage: SET key value [EX Seconds]")
			return
		}
		key := parts[1]
		value := parts[2]
		store.Data[key] = value

		if len(parts) == 5 && strings.ToUpper(parts[3]) == "EX" {
			seconds, error := strconv.Atoi(parts[4])

			if error != nil {
				println("Invalid TTL value")
				return
			}

			store.TTL[key] = time.Now().Add(time.Duration(seconds) * time.Second)
		}

		println("OK")

	case "GET":
		if len(parts) < 2 {
			println("Usage: GET key")
			return
		}
		key := parts[1]

		if store.IsExpired(key) {
			println("(nill)")
			return
		}

		if value, exists := store.Data[key]; exists {
			println(value)
		} else {
			println("(nil)")
		}

	case "DEL":
		if len(parts) < 2 {
			println("Usage: DEL key")
			return
		}
		key := parts[1]
		_, exists1 := store.Data[key]
		_, exists2 := store.Hashes[key]
		if exists1 {
			delete(store.Data, key)
			println("(1)")
		} else if exists2 {
			delete(store.Hashes, key)
			println("(1)")
		} else {
			println("(0)")
		}

	case "SAVE":
		err := store.SaveToFile("dump.json")
		if err != nil {
			println("SAVE failed:", err)
		} else {
			println("OK")
		}

	case "LOAD":
		err := store.LoadFromFile("dump.json")
		if err != nil {
			println("LOAD failed:", err)
		} else {
			println("OK")
		}
	}
}
