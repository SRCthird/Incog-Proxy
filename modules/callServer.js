const http = require('http');
const url = require('url');
const fs = require('fs');
const callIncognito = require('./callIncognito.js');
const getPort = require('./getPort.js');

const CONF_PATH = './conf.json';

const callServer = () => {
    const port = getPort();

    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);

        if (parsedUrl.pathname === '/') {
            const urlValue = parsedUrl.query.url;
        
            if (urlValue) {
                callIncognito(urlValue);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<html><body><script>window.close();</script></body></html>');
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request: Missing "url" query parameter.');
            }
        } else if (parsedUrl.pathname === '/admin/shutdown') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<html><body><p>Server is shutting down...</p><script>window.close();</script></body></html>');
            server.close(() => {
                console.log('Server has been shut down.');
            });
        } else if (parsedUrl.pathname === '/admin/') {
            const onStartValue = parsedUrl.query['on-start'];

            if (onStartValue === 'true' || onStartValue === 'false') {
                const currentConfig = JSON.parse(fs.readFileSync(CONF_PATH, 'utf8'));
                currentConfig['on-start'] = onStartValue;
                fs.writeFileSync(CONF_PATH, JSON.stringify(currentConfig, null, 2));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<html><body><p>Configuration updated successfully!</p><script>window.close();</script></body></html>');
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid on-start value. Please use true or false.');
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } 
    });

    server.listen(port, '127.0.0.1', () => {
        console.log(`Server is running at http://127.0.0.1:${port}/`);
    });
};

module.exports = callServer;