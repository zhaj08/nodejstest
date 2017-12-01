var express = require('express');
var router = express.Router();
var multer=require('multer');
var testdata=require('../datas/testdata');
var cstdealmanyreport=require('../src/controller/cstdealmanyreport');
var rwexcle=require('../src/controller/readwriteexcle');
var utilexcle=require('node-xlsx');


//上传路径
var uploading=multer({dest:'wenjian/'});
/* GET home page. */
router.get('/index', function(req, res, next) {
    // cstdealmanyreport.Handle(req,function(err, results) {
    //  });
    // console.log(results);
    res.render('index', {title:"网页测试",entries:JSON.stringify(testdata.getDatas())});
});



router.post('/ssqjs/insert_into_ssq',uploading.single('file'),function (req, res) {
    console.log(req.file);
    res.send({code:'200'});

});

router.get('/ssqjs', function(req, res, next) {
    // rwexcle.selectSsq(req,function (err, result) {
        res.render('ssqjs', {title: "计算值"});
    // });
});
router.get('/about', function(req, res, next) {
    res.render('about', {title: "自我介绍"});
});
router.get('/artucl/:id', function(req, res, next) {
  var entry=testdata.getEntry(req.params.id);

    res.render('artucl', {title:entry.title,blog:JSON.stringify(entry)});
});

module.exports = router;
