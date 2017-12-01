
// function getCstMany(conn) {
//     var sql="select\n" +
//         "  stat_dimension as statDimension,\n" +
//         "  type_value as typeValue,\n" +
//         "  reserve1 as age\n" +
//         "from `idata_bi_test_3.1`.r_t_m_cst_stat\n" +
//         "where module_code='cst_origin_place'\n" +
//         "      and type_code='tot_cst_deal_many_origin_place_age_o_t'\n" +
//         "      AND page_code='cst_deal_many_rpt'\n" +
//         "      and group_code = '11B11DB4-E907-4F1F-8835-B9DAAB6E1F23'\n" +
//         "      and static_year = '近一年'"
//     function executeSql(conn) {
//
//
//     }
// }
// module.exports=getCstMany;
exports.getCstMany=function (sql,conn) {
    var sql="select\n" +
        "  stat_dimension as statDimension,\n" +
        "  type_value as typeValue,\n" +
        "  reserve1 as age\n" +
        "from `idata_bi_test_3.1`.r_t_m_cst_stat\n" +
        "where module_code='cst_origin_place'\n" +
        "      and type_code='tot_cst_deal_many_origin_place_age_o_t'\n" +
        "      AND page_code='cst_deal_many_rpt'\n" +
        "      and group_code = '11B11DB4-E907-4F1F-8835-B9DAAB6E1F23'\n" +
        "      and static_year = '近一年'"
    function executeSql(conn) {
        conn.query(sql,function (err,result,field) {
            if(err){
                return JSON.stringify(err);
            }else {
                return JSON.stringify(result);
            }
        });

    }
}
