# MS Edge Private Proxy

A Node.js application that proxies URLs to open them in private Microsoft Edge windows.

## Prerequisites

- Node.js (v20.0 or higher)
- Microsoft Edge browser installed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SRCthird/incog-proxy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd incog-proxy
   ```

3. Install the required dependencies:

   ```bash
   npm i
   ```

## Configuration

You can adjust server settings by editing the `config.json` file:

```json
{
  "on-start": "true",
  "port": 42830
}
```

- `on-start`: Whether the application should start on startup. Default is true.
- `port`: The port on which the server will run.Default is 42830.

## Usage

### Start the server:

```bash
npm start
```

### Send a `GET` request to the server with the desired URL:

```bash
curl "http://127.0.0.1:42830/?url=https://example.com"
```

This will open `https://example.com` in a private Microsoft Edge window.

### Stop the server:

```bash
node stop
```
or:
```bash
curl "http://127.0.0.1:42830/admin/shutdown"
```

### Set on-start config

```bash
curl "http://127.0.0.1:42830/admin/?on-start=true"
```
or 
```bash
curl "http://127.0.0.1:42830/admin/?on-start=false"
```
or change it in the conf.json file

## API

### `GET /`

Opens the provided URL in a private MS Edge window.

**Parameters:**

- `url` (required) - The URL to open.

### `GET /admin/`

The URL to access admin settings of the server.

**Parameters:**

- `on-start` (optional) - Boolean, sets the on-start variable

**Paths:**

- `shutdown` (optional) - Shuts down the server.

## Limitations

This utility assumes that the `msedge` executable is available in the system's PATH.

## Security Notes

- This server should only be run in a trusted environment. Do not expose it to the public internet without adequate security measures.
- Always be cautious about the URLs you open.

## License

[ISC](./LICENSE)