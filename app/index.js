/**
 * @typedef {Object} Options
 * @property {string} dnsAddress
 * @property {string} username
 * @property {string} password
 */

try {
    const fs = require('fs');
    let options = JSON.parse(fs.readFileSync(process.env.HOME + "/ext_ip.config").toString());
    if (options.dnsAddress !== undefined && options.username !== undefined && options.password !== undefined) {
        const dnsAddress = options.dnsAddress;
        const statusFileName = process.env.HOME + '/ext_ip.txt';
        const username = options.username;
        const password = options.password;
        setInterval(() => {
            try {
                const http = require('http');
                const options = {
                    host: 'api.ipify.org',
                    port: 80,
                    path: '/?format=json'
                };
                const req = http.request(options, (res) => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', (chunk) => {
                        body += chunk;
                    });
                    res.on('end', () => {
                        try {
                            const data = JSON.parse(body);
                            console.log(data.ip);
                            let ipDisk;
                            try {
                                ipDisk = fs.readFileSync(statusFileName);
                            } catch (error) {
                                ipDisk = "";
                                let desc = fs.openSync(statusFileName, 'w');
                                fs.closeSync(desc);
                            }
                            if (data.ip !== ipDisk) {
                                const dns = require('dns')
                                dns.lookup(dnsAddress, async (err, result) => {
                                    try {
                                        console.log(result);
                                        if (result !== data.ip) {
                                            let result = await fetch(`https://domains.google.com/nic/update?hostname=${dnsAddress}&myip=${data.ip}`, {
                                                method: "get",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Basic ${btoa(username + ':' + password)}`,
                                                }
                                            });
                                            let response = await result.text();
                                            let startIndices = response.match(/\d/g);
                                            let startIndex = startIndices !== null ? response.indexOf(startIndices[0]) : -1;
                                            let endIndices = response.match(/\d/g);
                                            let endIndex = endIndices !== null ? response.lastIndexOf(endIndices[endIndices.length - 1]) : -1;
                                            if (startIndex !== -1 && endIndex !== -1) {
                                                let address = response.substring(startIndex, endIndex + 1);
                                                let addressArray = address.split(".");
                                                if (addressArray.length === 4 && !isNaN(parseInt(addressArray[0])) && !isNaN(parseInt(addressArray[1])) && !isNaN(parseInt(addressArray[2])) && !isNaN(parseInt(addressArray[3]))) {
                                                    console.log(`Address change successful. Response: ${response}`);
                                                } else {
                                                    console.error(`Address change unsuccessful. Response: ${response}`);
                                                }
                                            } else {
                                                console.error(`Address change unsuccessful. Response: ${response}`);
                                            }
                                        }
                                    } catch (error) {
                                        console.error(error)
                                    }
                                });
                                fs.writeFileSync(statusFileName, data.ip);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    });
                });
                req.end();
            } catch (error) {
                console.error(error);
            }
        }, 10000);
    }
} catch (error) {
    console.error(error);
}

module.exports = {
    name: "refresh-dns-with-google-domains",
    version: "0.0.1"
}
