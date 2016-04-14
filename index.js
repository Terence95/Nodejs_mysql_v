// 把server.js编程一个node.js模块
// 使得它可以被我们的inde.js主文件使用
// 在主文件index.js中启动http
var server = require("./server");
// 扩展index.js使得路由函数可以被注入到服务器中
var router = require("./router");
// 将reuqestHandler引入index主文件中
var requestHandlers = require("./requestHandlers");

var formidable = require("formidable");
var mysql = require('mysql');
var async = require('async');

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/showdataindb"] = requestHandlers.showdataindb;
handle["/showdbpng"] = requestHandlers.showdbpng;
server.start(router.route,handle);

// 如何来进行请求的路由
// 为路由提供请求的url和其他需要的get和post参数
// 需要的数据会包含在request对象中
// 对象作为onRequest()回调函数的第一个参数传递
// 为了解析数据，需要额外的Node.js模块

// rul模块和querystring模块
// 给onRequest()函数加上一些逻辑，用来找出浏览器请求的url路径


// 处理post请求
