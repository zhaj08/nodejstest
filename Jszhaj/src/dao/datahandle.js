exports.executeSql=function (req,sql,values,callback) {
    req.getConnection(function (err, conn) {
        if(err){
            callback(err);
        }else{
            //执行sql语句
            conn.query(sql,values,function (err, result) {
                if(err){
                    return callback(err);
                }else{
                    return callback(null,JSON.stringify(result));
                }
            });
            //关闭链接
            conn.end(function (err) {
                if(err){
                    return;
                }
                console.log('链接关闭');
            });
        }
    });
}
