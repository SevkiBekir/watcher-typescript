## Node/NPM Proxy Setup
    npm config set proxy http://localhost:3128
    npm config set https-proxy http://localhost:3128

* npm install
* npm install -g jspm
* HTTP_PROXY=http://localhost:3128/
* HTTPS_PROXY=%HTTP_PROXY%
* jspm install

jspm install material-ui=npm:material-ui
