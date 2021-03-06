# Runner Up

## Developing

### Requirements

In order to compile the files to obtain distribution-ready `.css` and `.js` files, you need a few things:

1. Node 6.X
1. NPM 3.X
1. Webpack (`npm install -g webpack`)
1. [Sass](http://sass-lang.com/install)

### Running
If you are running the app for the first time, and the client `.css` and `.js` files have not been built yet, you may be required to run:
```
npm install && npm run build && npm run db-init
```

To run the app, execute the following command in your terminal at the project ROOT:
```
npm start
```

To start populate the database, open a new tab and execute the following command:
```
npm run populate-db
```

Head over to your browser and open up `localhost:3000` to view the app.

#### Development Environment
In a development environment, `.js` files will be hot loaded so you do not need to execute the `npm run build` command every time you modify the front-end source code.

You can enable hot loading style changes with the following command:
```
npm run watch-style
```

#### Production Environment
You can run the app with production settings by executing the following command:
```
export NODE_ENV="production" && npm run build && npm start
```

**NOTE:** This will disable hot module reloads and minify `client.js`.


