const { exec } = require('child_process');

const callIncognito = (url) => {
    const command = `start msedge -inprivate "${url}"`
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

module.exports = callIncognito;
