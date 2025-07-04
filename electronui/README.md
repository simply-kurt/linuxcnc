# Electron UI for LinuxCNC

This folder contains a minimal Electron application. It connects to a running LinuxCNC instance via TCP on port `5007`.

## Usage

1. Install dependencies (only once):
   ```sh
   npm install
   ```
2. Start the application:
   ```sh
   npm start
   ```

The UI lets you connect and send manual commands to LinuxCNC. Incoming messages are shown in a small log area.
