var http = require("http");
var url = require("url");
// 扩展start函数 将路由函数作为参数传递过去
function start(route, handle) {
   function onRequest(request,response) {
        var postData = ""; 
        var pathname =  url.parse(request.url).pathname;
        console.log("Request for " + pathname +" received.");
        // route(handle, pathname, response);
        
        // request.setEncoding("utf8"); 这个对上传文件没用
        
        // request.addListener("data", function (postDataChunk) {
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk ' " + postDataChunk + " ."); 
        // });
        
        // request.addListener("end", function () {
        //     route(handle, pathname, response, postData);
        // });
        
        
        // 把onRequest()处理程序中所有关于response的函数都移除
        // 希望把这部分操作交由route()来完成 
        
        // response.writeHead(200, {
        // "Content-Type": "text/plain"
        // });
        // response.write("Hello world!");
        // response.end();
        route(handle, pathname, response, request);
        
    }
 var s = http.createServer(onRequest);
 s.listen(8080);
 console.log("sever has started");
}
exports.start = start;


// 运行node ..node server.js时，他会马上在命令行输出
//  "Server has started" 当我们向服务器发出请求时，
// "request received." 这条消息会在命令行中出现

// 这是事件驱动的一部服务器端js和它的回调

// onRequest()函数是一个回调函数
// 当回调启动，onRequest() 函数被触发
// 传入 req 和 res 两个参数


