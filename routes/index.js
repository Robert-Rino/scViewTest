var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var urlLink = [1, 2, 3, 4, 5];
  res.render('modal',
  { data:{
    keywords: [
      { name: '1-1 3m30s', url:'https://www.youtube.com/embed/S-Pdi6rsSU8?start=210&rel=0' },
      { name:'1-1 4m00s', url:'https://www.youtube.com/embed/S-Pdi6rsSU8?start=240&rel=0' },
      { name:'1-1 4m10s', url:'https://www.youtube.com/embed/S-Pdi6rsSU8?start=250&rel=0' },
      ],
  }, });
});

module.exports = router;
