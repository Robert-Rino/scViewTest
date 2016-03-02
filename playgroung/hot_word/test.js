// First I want to read the file
var fs = require('fs');
// fs.readFile('./1.txt', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = data;
//
//     // Invoke the next step here however you like
//     console.log(content);   // Put all of the code here (not the best solution)
//     processFile();          // Or put the next step in a function and invoke it
// });

function processFile() {
    console.log(content);
}

var data = JSON.parse(fs.readFileSync('./chapter-728-done.txt','utf8'));
console.log(data[4387]);
// console.log(data.ISO.vid_list);
// for (ele in data.ISO.vid_list){
//   console.log(data.ISO.vid_list[ele]);
// }
// for (ele in data){
//   console.log(data[ele]);
// };
