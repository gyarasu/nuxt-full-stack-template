# nuxt-full-stack-template

> Nuxt full stack template for creating web app easily.
![demo](https://raw.githubusercontent.com/wiki/gyarasu/nuxt-full-stack-template/img/nft.gif)

## About
This template includes as below.


### Nuxt.js
- [Nuxt.js](https://nuxtjs.org/)
- SSR
- Auth Route Sample

### Express.js
- [Express.js](http://expressjs.com/)
- [MySQL Connection](https://github.com/mysqljs/mysql)
- [Session Management](https://www.npmjs.com/package/express-mysql-session)
- [Logger](https://github.com/log4js-node/log4js-node)
- [Config file](https://github.com/lorenwest/node-config)
- Sample APIs
- Error Handler

### Process Management
- [PM2](http://pm2.keymetrics.io/)


## Requirements
### MySQL Docker
This sample app connects MySQL on localhost.
[mysql57-dokcer](https://github.com/gyarasu/mysql57-docker) is prepared for this template application.
By default, required table will be created automatically.

### PM2
To run this app by [pm2](http://pm2.keymetrics.io/), it requires `pm2` on your environment.
`PM2` enables the cluster mode.

### pm2-intercom
To use `log4-js` on cluster mode and to output logfile properly,
[pm2-intercom](https://www.npmjs.com/package/pm2-intercom) is required.


## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```
## Run Cluster Mode

```bash
$ pm2 start pm2.config.yml --env production
```

