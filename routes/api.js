var express = require('express');
var PythonShell = require('python-shell');
// var csv = require('fast-csv');
var csv = require('csv');
var stringify = require('csv-stringify');
var parse = require('csv-parse');
var $ = require('cheerio');
var _ = require('lodash');
var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var helper = require('../lib/helper.js');
var childProcess = require('child_process');
var router = express.Router();

const exec = require('child_process').exec;

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

router.get('/runPython', function (req, res) {
  // shell.echo('hello world');
  // shell.exec(path.join(__dirname, '..', 'playgroung', 'sc_text', 'source', 'trigger.sh'));
  // res.status(200).send(__dirname);
  var pathName = path.join(__dirname, '..', 'playgroung', 'sc_text', 'source', 'generateHotKeyword.py');
  // exec('python3' + pathName, function (err, stdout, stderr) {
  childProcess.execSync('mkdir testFileDic');
  res.sendStatus(200);
});

router.get('/getCloudData/:chid', function (req, res, err) {
  var chid = req.params.chid;
  var data = JSON.parse(fs.readFileSync('./playgroung/chapter-728-done.txt', 'utf8'));
  var chapterOrder = String(data[chid]);
  try {
    var returnData = JSON.parse(fs.readFileSync('./playgroung/hot_word/' + chapterOrder + '.txt', 'utf8'));
    res.send(200, returnData);
  } catch (e) {
    res.sendStatus(204);
  }
});

router.get('/readAndWriteCsvTest', function (req, res) {
  // shell.echo('hello world');
  var inpath = path.join(__dirname, '..', 'playgroung', 'sc_text', 'to_weeks_preprocessed', '1', '0.csv');
  var fileContent = fs.readFileSync(inpath, 'utf8');
  parse(fileContent, (err, csvArr) => {
    if (err) {
      console.log(err);
      throw err;
    }

    stringify(csvArr, function (err, output) {
      if (err) {
        throw err;
      }

      fs.writeFile('testCsvOut.csv', output, function (err) {
        if (err) {
          throw err;
        }

        res.sendStatus(200);
      });
    });
  });
});

module.exports = router;
