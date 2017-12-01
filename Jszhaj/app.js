//加载需要使用的模块/框架
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config=require('./config/config');
var mysql=require('mysql');//加载mysql框架
var app = express();




//
var connection=require('express-myconnection');//加载express-myconnection模块，mysql自动连接中间件

/*
设置连接模式三种：
single：创建单数据库应用实例，连接从不会关闭，万一连接因故障断掉，它还会重新连接。
pool：基于应用程序实例创建连接池，并且对每一个请求从连接池里提供连接，连接在每次response会自动释放返回到连接池里去。
request： 针对每个request创建新的连接， 并且在response结束时会自动关闭。
 */
app.use(connection(mysql,config.mysql,'single'));
// var engines = require('consolidate');//模版引擎合并库,加载haml和hogan引擎就可以使用html

var index = require('./routes/index');//加载index路由对象/接口
var users = require('./routes/users');//加载users路由对象/接口

app.set('views', path.join(__dirname, 'view'));//给view文件夹使用正确分隔符连接路径，设置views访问路径
// app.engine('html', engines.hogan);//使用html时需要加载的引擎
// app.engine('haml', engines.haml);//使用html时需要加载的引擎
app.set('view engine', 'jade');//设置jade引擎
//程序将一次调用下列中间件
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//注册favicon中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//指定静态文件存放目录

app.use('/', index);//给路由绑定地址
app.use('/users', users);//给路由绑定地址




// catch 404 and forward to error handler
//捕抓错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
