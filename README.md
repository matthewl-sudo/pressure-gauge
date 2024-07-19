# Tauri + React

A system monitor desktop app build with Tauri Rust 🦀 Similar to NZXT cam & MSI afterburner minus the bloatedness.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/matthewl-sudo/pressure-gauge.git
cd pressure-gauge
```

### 2. Add dependencies

```sh
npm i
```

### 3. Run app

```sh
npm run tauri dev
```

## Project Structure

- `src/`: The main directory for the Rust source code.
- `src-tauri/`: The Tauri-specific source code.
  public/: The directory for static assets.
- `src/main.rs`: The entry point for the Rust backend.
- `src-tauri/tauri.conf.json`: Configuration file for Tauri.

## Commands

`npm run tauri dev`: Start the development server.
`npm run tauri build`: Build the production-ready application.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
