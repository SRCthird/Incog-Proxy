import http from "http";
import getPort from "./getPort.js";

const  stopApp = () => {
    const port = getPort();

    http.get(`http://127.0.0.1:${port}/admin/shutdown`, (res) => {
        if (res.statusCode === 200) {
            console.log('Successfully requested server shutdown.');
        } else {
            console.error('Failed to shutdown server. Received status:', res.statusCode);
        }
    }).on('error', (err) => {
        console.error('Error requesting server shutdown:', err.message);
    });
}

export default stopApp;