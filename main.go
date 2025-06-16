package main

import (
	"bufio"
	"fmt"
	"os"
	"redis/commands"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	fmt.Println("Mini Redis Started. Type Commands")

	for {
		fmt.Print("> ")
		if !scanner.Scan() {
			break
		}
		line := scanner.Text()
		parts := strings.Fields(line)

		if len(parts) == 0 {
			continue
		}

		cmd := strings.ToUpper(parts[0])

		switch cmd {
		case "SET", "GET", "DEL":
			commands.HandleStringCommand(cmd, parts)

		case "HSET", "HGET", "HDEL":
			commands.HandleHashCommand(cmd, parts)

		default:
			fmt.Println("Unknown Command", cmd)
		}
	}
}
