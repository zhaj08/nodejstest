
var handle=require('../dao/datahandle');









// writeExl(wrows);

// function writeExl(datas) {
//     var buffer=utilexcle.build([{'name':'测试1','data':datas}]);
//     fs.writeFileSync('f://test1.xlsx',buffer);
// }
exports.insertSsq=function (req,callback) {
    var insertSql='insert into ssq_qhxj_fq(id,diyi,dier,disan,disi,diwu,diliu,lq,result,remark1,remark2,remark3) values(0,?,?,?,?,?,?,?,?,?,?,?)';



    handle.executeSql(req,insertSql,wrows,function (err,result) {
        if(err){
            callback(err);
        }else {
            //可以在此处理数据
            callback(result);
        }
    });

}

exports.selectSsq=function (req,callback) {
    var selectSql='select id,diyi,dier,disan,disi,diwu,diliu,lq,result,remark1,remark2,remark3 from ssq_qhxj_fq';
    handle.executeSql(req,selectSql,function (err, result) {
        if(err){
            callback(err);
        }else {
            //可以在此处理数据
            callback(result);
        }
    });
}