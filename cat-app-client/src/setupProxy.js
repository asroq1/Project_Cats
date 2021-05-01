const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            //target: "http://localhost:8080",
            target: "http://ec2-3-36-163-150.ap-northeast-2.compute.amazonaws.com:8080/",
            changeOrigin: true
        })
    );
};
