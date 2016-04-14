// 这个是路由
// 用来将请求以url路径为基准映射到处理程序上
// 使用非阻塞操作进行请求响应
function route(handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    // 首先检查给定的路径对应的请求处理程序是否存在，如果存在直接调用
    // 相应的函数
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    }else{
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;