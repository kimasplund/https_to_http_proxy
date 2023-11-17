const fs = require('fs');
const https = require('https');
const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const app = express();

const TARGET_HOST = 'http://example.com'; // Replace with your target host

let proxyMiddleware; // Declare the proxy middleware outside

// Initialize the proxy middleware only once
function getProxyMiddleware() {
  if (!proxyMiddleware) {
    const options = {
      target: TARGET_HOST,
      changeOrigin: true,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        const response = responseBuffer.toString('utf8');
        // Perform modifications to the response
        return response;
      })
    };
    proxyMiddleware = createProxyMiddleware(options);
  }
  return proxyMiddleware;
}

// Use the proxy middleware
app.use('/', (req, res, next) => {
  const middleware = getProxyMiddleware();
  return middleware(req, res, next);
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(443, () => {
  console.log('Listening on port 443 (HTTPS)');
});
