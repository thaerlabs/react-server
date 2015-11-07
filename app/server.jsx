import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { createProxyServer } from 'http-proxy';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import routes from './routes';
import configureStore from './store/configureStore';
import rootReducer from './reducers';

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.join(__dirname, '../public');

export function run() {

  const app = express();
  const store = configureStore(rootReducer);

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'templates'));

  if (!isProduction) {

    var proxy = createProxyServer();

    // Any requests to localhost:3000/assets is proxied
    // to webpack-dev-server
    app.all('/assets/*', function (req, res) {
      proxy.web(req, res, {
        target: 'http://localhost:8080'
      });
    });

  }
  else if (isProduction) {
    app.use(express.static(publicPath));
  }

  //Server side routing and rendering for react + react-router
  app.use(function (req, res, next) {
    let location = createLocation(req.url)

    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (redirectLocation)
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      else if (error)
        res.status(500).send(error.message)
      else if (renderProps == null)
        res.status(404).send('Not founds')
      else {
        res.render('index', {
          title: 'React App',
          intialState: JSON.stringify(store.getState()),
          reactHTML: renderToString(
              <Provider store={store}>
                <RoutingContext {...renderProps}/>
              </Provider>
          )
        });
      }
    })
  })

  // routes(app);

  let server = app.listen(port, () => {
    let host = (server.address().address === '::') ? 'localhost' : server.address().address;
    let port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);
  });
}