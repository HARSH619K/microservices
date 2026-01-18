import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
  target: "http://auth-service:4001",
  changeOrigin: true,

  pathRewrite: {
    "^/api/auth": "/auth",
  },

  // 🔑 IMPORTANT: forward request body correctly
  onProxyReq(proxyReq, req, res) {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

      proxyReq.write(bodyData);
    }
  },

  logLevel: "debug",
});
