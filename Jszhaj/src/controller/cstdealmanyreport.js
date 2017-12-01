
exports.Handle=function (param,callback) {
       var sql="select\n" +
           "  stat_dimension as statDimension,\n" +
           "  type_value as typeValue,\n" +
           "  reserve1 as age\n" +
           "from `idata_bi_test_3.1`.r_t_m_cst_stat\n" +
           "where module_code='cst_origin_place'\n" +
           "      and type_code='tot_cst_deal_many_origin_place_age_o_t'\n" +
           "      AND page_code='cst_deal_many_rpt'\n" +
           "      and group_code = '11B11DB4-E907-4F1F-8835-B9DAAB6E1F23'\n" +
           "      and static_year = '近一年'";
    var qhxjAddSql='insert into ssq_qhxj_fq(id,diyi,dier,disan,disi,diwu,diliu,lq,result,remark1,remark2,remark3) values(0,?,?,?,?,?,?,?,?,?,?,?)';
    var qhxjAddValue=[];
       param.getConnection(function (err, conn) {
           if(err){
               return callback(err);
           }else {
               //执行sql语句
               conn.query(sql,function (err, result) {
                   if(err){
                       return callback(err);
                   }else{
                       // console.log(JSON.stringify(result));
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


