<div id="readme-top"></div>

[//]: # (Project logo)
<br/>
<div align="center">
    <a href="https://github.com/S1riyS/poker-monte-carlo">
        <img src="assets/logo.png" alt="Logo" width="140" height="140">
    </a>
    <h3 align="center">PokerMonteCarlo</h3>
</div>

## 📌 About project
**PokerMonteCarlo** is fullstack web application for simulation of starting hand in poker with Monte-Carlo method. Proper data structures and optimizations along with concurrency are used to achieve high performance.

## 👀 Demo
![Demo GIF](assets/demo.gif)

## 🛠️ Technology Stack
### Client
- [TypeScript](https://www.typescriptlang.org/) – Language
- [React](https://react.dev/) - Framework
    - [Redux](https://redux.js.org/) - State Manager
- [Vite](https://vitejs.dev/) - Bundler
- [Bun](https://bun.sh/) - Runtime

### Server
- [Go](https://go.dev/) - Language
- [Fiber](https://gofiber.io/) - Framework
- [Swagger](https://swagger.io/) - Documentation

## 🚀 Getting Started
### Manual
Client (with `bun`):
```bash
cd client
bun install # Install dependencies
bun run dev # Run dev server
```

Client (with `npm`):
```bash
cd client
npm install # Install dependencies
npm run dev # Run dev server
```

Server:
```bash
cd server
make install-deps # Install binary dependencies
make swagger # Generate swagger docs
make build # Build binary
./main # Run server
```
You can use `make help` to get more info about available commands about server

### Docker
⏳ *Will be added later...*

## ✒️ Authors
<table>
  <tr>
    <!-- Ankudinov Kirill -->
    <td align="center" style="width: 200px; padding: 10px;">
      <a href="https://github.com/S1riyS" style="text-decoration: none;">
        <img src="https://github.com/S1riyS.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Ankudinov Kirill"/>
        <br />
        <sub><b>Ankudinov Kirill</b></sub>
      </a>
      <div style="margin-top: 5px;">
        <span>Backend Dev</span><br>
      </div>
    </td>
    <!-- Lavrentiev Lev -->
    <td align="center" style="width: 200px; padding: 10px;">
      <a href="https://github.com/lavrentious" style="text-decoration: none;">
        <img src="https://github.com/lavrentious.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Lavrentiev Lev"/>
        <br />
        <sub><b>Lavrentiev Lev</b></sub>
      </a>
      <div style="margin-top: 5px;">
        <span>Frontend Dev</span><br>
      </div>
    </td>
    <!-- Volokitin Alexander -->
    <td align="center" style="width: 200px; padding: 10px;">
      <a href="https://github.com/ASVolokitin" style="text-decoration: none;">
        <img src="https://github.com/ASVolokitin.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Volokitin Alexander"/>
        <br />
        <sub><b>Volokitin Alexander</b></sub>
      </a>
      <div style="margin-top: 5px;">
        <span>Evaluation algorithm</span><br>
      </div>
    </td>
  </tr>
</table>

<p align="right"><a href="#readme-top">⬆️ Back To Top</a></p>