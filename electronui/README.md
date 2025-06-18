# Electron React UI for LinuxCNC

This folder contains a minimal Electron application with a React based renderer.
The application connects to a running LinuxCNC instance via TCP on port `5007`.

## Usage

1. Install dependencies (already done once):
   ```sh
   npm install
   ```
2. Build the renderer bundle:
   ```sh
   npm run build
   ```
3. Start the electron application:
   ```sh
   npm start
   ```

The React interface allows you to connect and send manual commands to the
LinuxCNC kernel. Incoming messages from LinuxCNC are displayed in a log area.

This is only a minimal example and does not implement the full feature set of
Axis or gmoocapy, but it demonstrates how to create an Electron environment
using React that communicates with LinuxCNC via TCP.
