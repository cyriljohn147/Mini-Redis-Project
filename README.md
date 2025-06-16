# 🧠 MiniRedis
### Your Own In-Memory Key-Value Store in Go

MiniRedis is a lightweight, Redis-inspired key-value store built from scratch in Go.
It supports core Redis features including string and hash operations, TTL expiration, persistence, and even TCP-based access — all without external dependencies.

---

## ⚙️ Features

- 🔑 `SET`, `GET`, `DEL` — Basic string key-value storage
- 🧱 `HSET`, `HGET`, `HDEL` — Hash map support (`map<string, string>`)
- ⏱️ `EX` for TTL — Expire keys after `n` seconds
- 💾 `SAVE` and `LOAD` — File-based persistence to/from JSON
- 🧩 `HSET` supports multiple field-value pairs
- 🌐 TCP Server — Accepts client connections over `localhost:6379`
- 🧼 Clean, modular structure for easy scaling and maintenance

---

## 🗂️ Project Structure

```text
mini-redis/
├── main.go                    # Starts TCP server and handles clients
├── commands/
│   ├── string.go              # Handles string commands (SET, GET, DEL, SAVE, LOAD)
│   └── hash.go                # Handles hash commands (HSET, HGET, HDEL)
└── store/
    └── store.go               # Shared data maps, TTL logic, and persistence
```

⸻

🚀 Getting Started

# Step 1: Clone the repository
```bash
git clone https://github.com/your-username/mini-redis.git
cd mini-redis
```

# Step 2: Run the server
```bash
go run main.go
```

✅ Then, in another terminal:
```bash
nc localhost 6379
```

You’ll see:

MiniRedis TCP - Type Commands
>


⸻

💻 Supported Commands

📌 String Commands

```text
SET key value
GET key
DEL key
SET key value EX 10     # expires in 10 seconds
SAVE                    # writes state to dump.json
LOAD                    # restores from dump.json
```

🧩 Hash Commands

```text
HSET user:1 name Alice age 23 country India
HGET user:1 name
HDEL user:1 age
```

⸻

📦 Example Session

```bash
> SET name Alice EX 5
OK
> GET name
Alice
(wait 5 seconds)
> GET name
(nil)

> HSET user:1 name Alice age 23
OK
> HGET user:1 name
Alice
> SAVE
OK
```

⸻

🛠 Built With
	•	✅ Go (Golang) — No external libraries
	•	🧠 In-memory maps for speed
	•	⌛ time.Time for TTL management
	•	🧵 Goroutines for TCP client handling
	•	📁 JSON for persistence

⸻

🤓 Learn by Building

This project is a hands-on way to learn:
	•	How Redis works under the hood
	•	Building TCP servers in Go
	•	Working with in-memory stores
	•	Structuring modular Go projects

⸻

📜 License

This project is licensed under the MIT License.

⸻

✨ Todo / Future Ideas
	•	🔄 Append-only file (AOF) persistence mode
	•	🧹 LRU key eviction policy
	•	📈 Metrics / Stats for debugging
	•	🧪 Unit tests & benchmarking
	•	🛡️ Authentication and user access control

⸻

🙌 Contribute

Pull requests and issues are welcome! If you found this useful or learned something — star ⭐ the repo or share with others.

---

Let me know if you’d like:
- GitHub badges (Go version, license, etc.)
- A sample `.env` or config
- Screenshots or diagrams of how data is structured in memory
- Docker support or Makefile to automate build/run

All are great final polish steps.
