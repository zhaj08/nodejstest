var utilexcle=require('node-xlsx');
var fs=require('fs');
var exc=utilexcle.parse('f://ddd.xlsx');
var config=require('../config/config');
var mysql=require('mysql');//加载mysql框架
var promise=require('bluebird');



//模拟数据
var entries=[
    {"id":1, "title":"第一篇", "body":"正文", "published":"6/2/2013"},
    {"id":2, "title":"第二篇", "body":"正文", "published":"6/3/2013"},
    {"id":3, "title":"第三篇", "body":"正文", "published":"6/4/2013"},
    {"id":4, "title":"第四篇", "body":"正文", "published":"6/5/2013"},
    {"id":5, "title":"第五篇", "body":"正文", "published":"6/10/2013"},
    {"id":6, "title":"第六篇", "body":"正文", "published":"6/12/2013"}
]





exports.getDatas=function () {
    return entries;
}

exports.getEntry=function (id) {
    for(var i=0;i<entries.length;i++){

        if(entries[i].id==id){
            return entries[i];
        }
    }
}

handledata();

function handledata() {
    var sheet1=exc[0];
    var wrows=[];
    for(var i=0;i<sheet1.data.length;i++){
        var row=sheet1.data[i];
        var dataR=[];
        for(var j=1;j<row.length;j++){
            var nums=row[j];
            if(nums.toString().charAt(1)!=''){
                var num=parseInt(nums.toString().charAt(0))+parseInt(nums.toString().charAt(1));
                dataR.push(num);
            }else{
                dataR.push(nums);
            }
        }
        dataR.sort(function (a, b) {
            return a-b;
        });
        //向数组第一位插入一个或多个元素
        dataR.unshift(row[0]);
        wrows.push(dataR);





    }
    //


    // insertsum(wrows);
    insertssq(wrows);

}


function asHand(sql) {
    return new promise(function (resolve,obj) {
            execuSelect(sql,function (err, result) {
                if(err){
                    obj(err);
                }else {
                    var json=JSON.stringify(result);
                    resolve(json);
                }
            });
    });
};

function insertssq(sw) {
    var selectsql="select count(if(same3time!='0',same3time,null)) as same3," +
                          "count(if(same4time!='0',same4time,null)) as same4," +
                          "count(if(same5time!='0',same5time,null)) as same5," +
                          "count(if(same6time!='0',same6time,null)) as same6," +
                          "count(if(same7time!='0',same7time,null)) as same7 " +
                          "from samesum where opentime= ";
    var datas=[];
    var n=0;
    sw.forEach(function (t) {
        asHand(selectsql+t[0]).then(function (ee) {
            var json=JSON.parse(ee)[0];
            t.push(json.same3);
            t.push(json.same4);
            t.push(json.same5);
            t.push(json.same6);
            t.push(json.same7);
        }).finally(function () {
            var insertSql='insert into ssq_qhxj_fq(id,opentime,diyi,dier,disan,disi,diwu,diliu,lq,same3,same4,same5,same6,same7) values(0,?,?,?,?,?,?,?,?,?,?,?,?,?)'
            execuInsert(insertSql,t);
        });
    })

}
function insertsum(ws) {
    var insersum='insert into samesum(opentime,same3time,same4time,same5time,same6time,same7time) values(?,?,?,?,?,?)'
    var datax=[];
    var datay=[];
    for(var n=0;n<ws.length-1;n++){
        datax=ws[n];
        for(var k=n+1;k<ws.length;k++){
            var sum=[];

            datay=ws[k];
            var str=0;
            sum[0]=datax[0];
            for(var m=1;m<8;m++){
                if(datax[m]==datay[m]){
                    str++;
                }
                sum[m]=0;
            }
            if(str==3){
                sum[1]=datay[0];
                execuInsert(insersum,sum);
            }else if(str==4){
                sum[2]=datay[0];
                execuInsert(insersum,sum);
            }else if(str==5){
                sum[3]=datay[0];
                execuInsert(insersum,sum);
            }else if(str==6){
                sum[4]=datay[0];
                execuInsert(insersum,sum);
            }else if(str==7){
                sum[5]=datay[0];
                execuInsert(insersum,sum);
            }

        }

    }
}

function execuInsert(sql, datas) {
    console.log(datas);

    var conn=mysql.createConnection(config.mysql);
    conn.connect();
    conn.query(sql,datas,function (err,result) {
        if(err){
            console.log(err);
        }else {
            console.log(result);
        }
    })
    conn.end();
}
function execuSelect(sql, callback) {
    var conn=mysql.createConnection(config.mysql);
    conn.connect();
    conn.query(sql,function (err,result) {
            callback(err,result);
    })
    conn.end();
}




