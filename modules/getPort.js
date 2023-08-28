import fs from 'fs';

const getPort = () => {
    let config = {};
    try {
        config = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
    } catch (error) {
        console.error('Error reading conf.json:', error);
    }

    return config.port || 42830;
}

export default getPort;
