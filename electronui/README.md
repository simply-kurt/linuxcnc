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

### Troubleshooting

If Electron shows an `Unable to load preload script` error or complains about
`module not found: react`, the React dependencies are missing. Make sure you ran
`npm install` **inside** the `electronui` directory. The preload script loads
React and ReactDOM dynamically; without these packages the UI cannot render.

If the window fails to load with a `module not found: react` error, ensure that
you have installed the dependencies by running `npm install` in this directory.
The `preload.js` script dynamically requires the React packages and exposes
them in the browser context. Because of this the UI files do not import React
directly; `public/renderer.js` reads `window.React` and `window.ReactDOM` which
are populated by `preload.js` when the app starts.

If you see a `renderer.js:36 Unexpected end of input` error in the devtools
console, check that `public/renderer.js` is fully updated and contains the
closing `});` at the end of the file. A truncated file from an old build can
trigger this syntax error.

The tests in `__tests__/renderer.test.js` and `__tests__/preload.test.js` verify
that the UI files are intact and that the preload layer exposes the expected
globals. They also check that a helpful message is printed if the React
dependencies are missing. Run `npm test` after installing dependencies to ensure
the files have not been truncated and that React can be loaded.

The UI is rendered by a small React component in `public/renderer.js`. The exposed
`electronAPI`, `React`, and `ReactDOM` objects are provided by `preload.js` so no
bundling step is necessary. The single `App` component displays a connect button,
an input field with a send button, and a log of messages from LinuxCNC.
