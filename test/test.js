const fs = require('fs');
let optionFileNAme = process.env.HOME + "/ext_ip.config";
let descriptor;
try {
    descriptor = fs.openSync(optionFileNAme, "r");
} catch (error) {
    console.error("Config file doesn't exists. Create template config file in " + optionFileNAme);
    descriptor = fs.openSync(optionFileNAme, "w");
    fs.closeSync(descriptor);
    fs.writeFileSync(optionFileNAme, JSON.stringify({
        dnsAddress: "<dns address>",
        username: "<DynsmicDNS username>",
        password: "<DynsmicDNS password>"
    }, null, 4));
    console.log("Change parameters in config file and repeat the test.")
    return;
}
let options;
try {
    options = JSON.parse(fs.readFileSync(optionFileNAme).toString());
} catch (error) {
    console.error("Bad configuration file.");
    return;
}
if (options.dnsAddress === undefined || options.username === undefined || options.password === undefined) {
    console.error("Bad configuration file.");
    return;
}
const refreshDns = require("refresh-dns-with-google-domains");
if (refreshDns.name !== undefined && refreshDns.version !== undefined) {
    console.log(refreshDns.name + " " + refreshDns.version);
    console.log("TEST OK");
} else {
    console.error("Bad module");
}
