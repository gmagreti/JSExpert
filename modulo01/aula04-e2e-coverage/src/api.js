const http = require('http');
const { once } = require('events');
const DEFAULT_USER = { username: 'admin', password: 'admin' };

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page')
    return response.end();
  },
  '/login:post': async (request, response) => {
    const data = JSON.parse(await once(request, 'data'))
    if (data.username !== DEFAULT_USER.username || data.password !== DEFAULT_USER.password) {
      response.writeHead(401);
      return response.end('Logging failed');
    }
    console.log({ data });
    return response.end("Login has succeeded");
  },
  default: (request, response) => {
    return response.end('Not found');
  }
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;

  const chosen = routes[routeKey] || routes.default;

  return chosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => console.log("Running at 3000"));

module.exports = app;