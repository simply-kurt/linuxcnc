# Electron UI for LinuxCNC

This folder contains a minimal Electron application written with **React**. It connects to a running LinuxCNC instance via TCP on port `5007`.

## Usage

1. Install dependencies (only once):
   ```sh
   npm install
   ```
2. Start the application (no build step is required):
   ```sh
   npm start
   ```
   If you update the repository, run `git pull` and `npm install` again to make
   sure your local copy is in sync.

If you see a `renderer.js:36 Unexpected end of input` error in the devtools
console, check that `public/renderer.js` is fully updated and contains the
closing `});` at the end of the file. A truncated file from an old build can
trigger this syntax error.

The UI is rendered by a small React component in `public/renderer.js`. The exposed
`electronAPI`, `React`, and `ReactDOM` objects are provided by `preload.js` so no
bundling step is necessary. The single `App` component displays a connect button,
an input field with a send button, and a log of messages from LinuxCNC.
