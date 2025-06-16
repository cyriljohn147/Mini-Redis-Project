package commands

import (
	"fmt"
	"redis/store"
	"strconv"
	"strings"
	"time"
)

func HandleStringCommand(cmd string, parts []string) {
	switch cmd {
	case "SET":
		if len(parts) < 3 {
			fmt.Println("Usage: SET key value [EX Seconds]")
			return
		}
		key := parts[1]
		value := parts[2]
		store.Data[key] = value

		if len(parts) == 5 && strings.ToUpper(parts[3]) == "EX" {
			seconds, error := strconv.Atoi(parts[4])

			if error != nil {
				fmt.Println("Invalid TTL value")
				return
			}

			store.TTL[key] = time.Now().Add(time.Duration(seconds) * time.Second)
		}

		fmt.Println("OK")

	case "GET":
		if len(parts) < 2 {
			fmt.Println("Usage: GET key")
			return
		}
		key := parts[1]

		if store.IsExpired(key) {
			fmt.Println("(nill)")
			return
		}

		if value, exists := store.Data[key]; exists {
			fmt.Println(value)
		} else {
			fmt.Println("(nil)")
		}

	case "DEL":
		if len(parts) < 2 {
			fmt.Println("Usage: DEL key")
			return
		}
		key := parts[1]
		_, exists1 := store.Data[key]
		_, exists2 := store.Hashes[key]
		if exists1 {
			delete(store.Data, key)
			fmt.Println("(1)")
		} else if exists2 {
			delete(store.Hashes, key)
			fmt.Println("(1)")
		} else {
			fmt.Println("(0)")
		}
	}
}
