const fs = require('fs');
const https = require('https');
const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const app = express();

// Configuration variable for the target host
const TARGET_HOST = 'http://example.com'; // Replace with your target host

// Proxy middleware options with response handling
const options = {
  target: TARGET_HOST,
  changeOrigin: true,
  selfHandleResponse: true, // The proxy will manage the response
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    // Modify or translate the response from the printer here
    // For example, you can change headers, status code, or the response body
    const response = responseBuffer.toString('utf8'); // Assuming the response is a string
    // Perform necessary modifications to the response
    return response;
  })
};

// Use the proxy middleware
app.use('/', createProxyMiddleware(options));

// HTTPS server with self-signed certificate
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(443, () => {
  console.log('Listening on port 443 (HTTPS)');
});
