# Mini-Redis-Project

A lightweight, educational implementation of a Redis-like in-memory key-value store, supporting basic Redis commands and built using JavaScript and Go. This project demonstrates core concepts behind Redis, including command parsing, data storage, and simple networking, making it a useful resource for learning about distributed databases and server design.

---

## Features

- **In-memory key-value store** with support for basic Redis commands (`SET`, `GET`, `DEL`, etc.)
- **Command-line interface (CLI)** for interacting with the server
- **Built with JavaScript and Go** for demonstration and performance comparison
- **Simple networking** to allow multiple clients
- **Modular code structure** for easy extensibility
- **Basic error handling and command validation**

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for JavaScript implementation)
- [Go](https://golang.org/) (for Go implementation)
- git (to clone the repository)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cyriljohn147/Mini-Redis-Project.git
   cd Mini-Redis-Project
   ```

2. Install dependencies for the JavaScript implementation:
   ```bash
   cd js-server
   npm install
   ```

3. (Optional) Build the Go implementation:
   ```bash
   cd ../go-server
   go build
   ```

---

## Usage

### JavaScript Server

```bash
cd js-server
npm start
```

### Go Server

```bash
cd go-server
go run main.go
```

### Example Commands

You can interact with the server using telnet, netcat, or the provided CLI:

```bash
telnet localhost 6379
```

Example session:
```
SET foo bar
OK
GET foo
bar
DEL foo
1
```

---

## Project Structure

```
Mini-Redis-Project/
│
├── js-server/      # JavaScript implementation
│   └── ...
├── go-server/      # Go implementation
│   └── ...
├── client/         # Optional CLI client
│   └── ...
├── README.md
└── ...
```

---

## Contributing

Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

- Inspired by [Redis](https://redis.io/)
- Educational resources on distributed systems and databases
