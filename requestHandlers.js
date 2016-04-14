// 路由的目标函数是请求处理函数，该模块用于处理请求
// 对于每个请求处理程序，添加一个占位用函数，随后将这些函数
// 作为模块的方法导出
var mysql = require('mysql');
var async = require('async');
var exec = require("child_process").exec;
var querystring = require("querystring");
    fs = require("fs");
    formidable = require("formidable");

function  start(response, request) {
    console.log("Request handler 'start' was called.");
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<h3>Service that without use database</h3>'+
    '<div>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</div>'+
    '<h3  style="padding-top:40px">Service that use database(Read the data from database)</h3>'+
    '<div>'+
    '<p>press the button to show the data in database</p>'+
    '<form action="/showdataindb">'+
    '<input type="submit" value="submit">'+
    '</form>'+
    '</div>'+
    '</body>'+
    '</html>';
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "/Users/terence/Desktop/node.js学习/Nodejs_mysql_v/png/test.png")
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
}

function show(response, request) {
    console.log("Request handler 'show' was called.");
    var sec = 50*1;
    setTimeout(function() {
        fs.readFile("/Users/terence/Desktop/node.js学习/Nodejs_mysql_v/png/test.png", "binary", function (error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
    }, sec);
}

function showdbpng(response, request) {
        fs.readFile("/Users/terence/Desktop/node.js学习/Nodejs_mysql_v/dbpng/dbdata.png", "binary", function (error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

function showdataindb(response, request) {

    console.log("Request handler 'showdataindb' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>SHOW DATA IN DB</h1>"+
                   "<div style='padding-bottom:30px;'>"+
                   "<p>The data in table t_user</p>"+
                   "<img src='/showdbpng'>"+
                   "</div>");
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'nodejs',
        password: 'nodejs',
        database:'nodejs',
        port: 3306
    });
    
    // 检测链接是否成功
    conn.connect(function (err) {
        if (err) {
            console.log('[query]-' + err);
            return;
        }
        console.log('[connecttion connect] succeed!');
    });
    
    // 执行sql语句
    conn.query("select * from t_user", function (err, res) {
        if (err) {
            console.log('[query]-: ' + err);
            return;
        }
        res.forEach(function (user) {
            response.write("<li>t_user-id: " + user.id + " t_user-name: " + user.name + " t_user-create_date: " + user.create_date);
        });
        console.log("[Query] Success!");
        
    });
    
    
}

// 作为方法导出
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.showdataindb = showdataindb;
exports.showdbpng = showdbpng;