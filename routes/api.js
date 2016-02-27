var express = require('express');
var PythonShell = require('python-shell');
var csv = require('fast-csv');
var $ = require('cheerio');
var _ = require('lodash');
var helper = require('../lib/helper.js');
var router = express.Router();

/* GET users listing. */
router.get('/chapterInfo', function (req, res, next) {
  //    Run python
  //   PythonShell.run('script/hello.py', function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  // });
  var content = [];
  csv
   .fromPath('playgroung/v_chapter_video.csv')
   .on('data', function (data) {
    content.push(data);

    // console.log(data);
  })
   .on('end', function () {
     var vidArr = []; // array store video id in sharecourse
     var vHashArr = []; // array store youtube hash
     var chapterOrder = []; // array for checking different chapter
     var chapterIndex = 0; //now chapter index
     var isInitial = 1;
     for (var index = 0; index < content.length; index++) {
       var chapterTmp = parseInt(content[index][2]); //current chapte in iteration
       var urlsTmp = content[index][6];
       var lectureName = content[index][5];
       if (isInitial == 1) {
         isInitial = 0;
         chapterOrder.push(chapterTmp);
         vidArr.push(Array(content[index][4]));
         vHashArr.push(Array({ vhash:helper.getYoutubeHash(urlsTmp), vname:lectureName }));
       }else {// if not initial
         if (_.indexOf(chapterOrder, chapterTmp) != -1) {// already in chapterOrder array
           vidArr[chapterIndex].push(content[index][4]);
           vHashArr[chapterIndex].push({ vhash:helper.getYoutubeHash(urlsTmp), vname:lectureName });
         }else {
           chapterIndex++;
           chapterOrder.push(chapterTmp);
           vidArr.push(Array(content[index][4]));
           vHashArr.push(Array({ vhash:helper.getYoutubeHash(urlsTmp), vname:lectureName }));
         }
       }
     }

    //  console.log(vidArr.length);
     res.send(vHashArr);
   });

});

module.exports = router;
