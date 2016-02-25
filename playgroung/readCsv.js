'use strict';
let csv = require('fast-csv');
let content = [];
let vidArr = [];
csv
 .fromPath('chapter.csv')
 .on('data', function (data) {
  content.push(data);

  // console.log(data);
})
 .on('end', function () {
   for (let index = 0; index < content.length; index++) {
    //  console.log(content[index]);
     vidArr.push(content[index][4])
    //  vidArr.push(chapter);
   }

   console.log(vidArr);
  //  console.log(content);
   console.log('done');
 });
