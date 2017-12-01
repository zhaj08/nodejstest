//统一环境变量

var test=require('../config/test');
var develop=require('../config/develop');
var production=require('../config/production');

//根据process.env.NODE_ENV环境变量名判断返回哪个环境
function congif() {
    switch (process.env.NODE_ENV){
        case 'test':return test;break;
        case 'develop':return develop;break;
        case 'production':return production;break;
        default:return develop;
    }
}

module.exports=congif();