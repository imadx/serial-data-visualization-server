# Serial Data Visualization Server
Serial Data Visualization Server Starter Kit for serial port related projects

## Getting Started
1. Clone the repository ( Star this repository as well ;) )
2. Install the dependencies with `npm install`
3. Run the server with `npm start`

## Special Note
This is still in beta. Currently a single numeric reading (e.g. `834.74`) separated with `'\n'` should be written through the Serial Port, for the web interface to run correctly.

## Walkthrough
1. Connect your serial input device
2. Run the server with `npm start` to get a list of serial devices
3. Configure the name of the device, COM_PORT, at `./settings/config.js`
    OR
   Start the server as `npm start <COM_PORT>`, where COM_PORT will be something like `COM4 ` in Windows systems or `/dev/tty-usbserial1` in Unix-like systems.
4. Head to the started server with your browser, which defaults to `http://localhost:8080`
5. Customize this at your own will!

## Configurations

Check the `settings/config.js` for available configurations.

`module.exports = {
    port: "8080",
    COM_PORT: undefined, // e.g. "COM1"
    COM_baudRate: 9600,

    dashboardEndpoint: "/",

    log_data_exchanged_on_console: false,
}`

At runtime, when the browser is pointed to the dashboard page, which defaults to `http://localhost:8080`, set `enable_log_data_to_console=true;` in console (Debugger Tools) to enable data output on the console.