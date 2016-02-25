module.exports = {
  getYoutubeHash: function (urls) {
    var splitArr = urls.split('；');//this is a chinese semicolon !
    if (splitArr.length == 1) {
      var youtubeHash = urls.split('/')[3];
      if (youtubeHash.split('=').length > 1){ // if youtubeHash = 'watch?v=xxxxxxxx'
        return youtubeHash.split('=')[1];
      }

      return youtubeHash;
    }else {
      var youtubeUrl = splitArr[0];
      var youtubeHash = youtubeUrl.split('/')[3];
      if (youtubeHash.split('=').length > 1){ // if youtubeHash = 'watch?v=xxxxxxxx'
        return youtubeHash.split('=')[1];
      }
      return youtubeHash;
    }
  },
};
