[![RefreshDns Logo](img/logo.png)]

Fast, light, minimalist DNS polling refresh for Google Domains Dynamic DNS [Node.js](http://nodejs.org).

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```js
require('refresh-dns-with-google-domains').refresh();
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install refresh-dns-with-google-domains
```
### Config file

Create a file named `ext-ip.config` in your HOME directory.

```console
$ nano /home/USERNAME/ext-ip.config
```


Following template:
```console
{
    "dnsAddress": "your-hostname",
    "username": "Google-Domains-Dynamic-DNS-username",
    "password": "Google-Domains-Dynamic-DNS-password"
}
```
Change file with your parameters and save.

It will create a file in your home directory named `ext-ip.txt`` with your actual external IP. This is a temporary file. YOU DON'T ERASE IT.

### Running Tests

To run the test suite, enter in the `test` directory, then run `npm run start`:

```console
$ cd /home/USERNAME/node_modules/refresh-dns-with-google-domains/test
$ npm install
$ npm run start
```

If you don't have the config file, the test suite will create a template config file for you.

## License

[ISC](LICENSE)

[github-actions-ci-image]: https://badgen.net/github/checks/expressjs/express/master?label=linux
[github-actions-ci-url]: https://github.com/expressjs/express/actions/workflows/ci.yml
[npm-downloads-image]: https://badgen.net/npm/dm/express
[npm-downloads-url]: https://npmcharts.com/compare/express?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/express
[npm-install-size-url]: https://packagephobia.com/result?p=express
[npm-url]: https://npmjs.org/package/express
[npm-version-image]: https://badgen.net/npm/v/express
