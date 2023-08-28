import http from 'http';
import getPort from './getPort.js';

const checkServerStatus = (callback) => {
    const port = getPort();

    http.get(`http://127.0.0.1:${port}`, (res) => {
        if (res.statusCode === 200) {
            callback(true);
        } else if (res.statusCode === 400) {
            callback(false);
        } else {
            console.error('Received unexpected status:', res.statusCode);
            callback(null);
        }
    }).on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            callback(false);
        } else {
            console.error('Error checking server status:', err);
            callback(null);
        }
    });
}

export default checkServerStatus;