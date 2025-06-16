package main

import (
	"bytes"
	"fmt"
	"net"
	"redis/commands"
	"strings"
)

func main() {
	listener, err := net.Listen("tcp", ":6379")
	if err != nil {
		panic(err)
	}
	fmt.Println("MiniRedis TCP server started on port 6379...")

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Connection error:", err)
			continue
		}
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()
	buffer := make([]byte, 1024)

	conn.Write([]byte("MiniRedis TCP - Type Commands\n> "))

	for {
		n, err := conn.Read(buffer)
		if err != nil {
			return
		}
		input := strings.TrimSpace(string(buffer[:n]))
		parts := strings.Fields(input)
		if len(parts) == 0 {
			conn.Write([]byte("> "))
			continue
		}

		cmd := strings.ToUpper(parts[0])
		output := captureCommandOutput(cmd, parts)
		conn.Write([]byte(output + "\n> "))
		if cmd == "QUIT" || cmd == "EXIT" {
			return
		}
	}
}

func captureCommandOutput(cmd string, parts []string) string {
	var buf bytes.Buffer
	println := func(a ...any) {
		fmt.Fprintln(&buf, a...)
	}

	switch cmd {
	case "SET", "GET", "DEL", "SAVE", "LOAD":
		commands.HandleStringCommand(cmd, parts, println)
	case "HSET", "HGET", "HDEL":
		commands.HandleHashCommand(cmd, parts, println)
	case "QUIT", "EXIT":
		println("Closing Connection. Goodbye!")
		return "Closing Connection. Goodbye!"
	default:
		println("Unknown command:", cmd)
	}
	return strings.TrimSpace(buf.String())
}
