## Node/NPM Proxy Setup
    npm config set proxy http://localhost:3128
    npm config set https-proxy http://localhost:3128

* npm install
* npm install -g jspm
* HTTP_PROXY=http://localhost:3128/
* HTTPS_PROXY=%HTTP_PROXY%
* jspm install

jspm install material-ui=npm:material-ui

Install: Semantic-UI

jspm install semantic-ui=github:Semantic-Org/Semantic-UI -o "{ 'directories': { 'lib': 'dist' }, main: 'semantic', 'shim': { 'semantic': { 'deps': [ 'jquery', 'semantic-ui/semantic.css!' ] } }, 'dependencies': { 'jquery': 'github:components/jquery', 'css': 'github:systemjs/plugin-css' } }"



