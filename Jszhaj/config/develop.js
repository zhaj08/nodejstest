//开发环境配置
var config={
    address:'127.0.0.1',
    env:'develop',//环境变量名称
    port:3001,
    mysql:{
        //数据库配置
        host:'127.0.0.1',
        user:'root',
        port:3306,
        password:'184520',
        database:'zj'
    },
    mongodb:{
        //mongodb数据库配置
    },
    redis:{
        //redis数据库配置
    }
}
module.exports=config;