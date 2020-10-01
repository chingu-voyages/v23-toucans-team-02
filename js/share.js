function screenCapture() {

//https://stackoverflow.com/questions/2572333/google-chrome-window-open-workaround

  html2canvas(document.body).then(function(canvas) {

    // Export the canvas to its data URI representation
    var base64image = canvas.toDataURL("image/png");
    console.log(base64image);
    // Open the image in a new window
    window.open(base64image);
  });
}

function shareOnTwitter() {

  var weatherTemp;
  var tweetMessage;
  weatherTemp = document.getElementById('temperature').innerHTML;
  console.log("CURRENT TEMP:" + weatherTemp);
  tweetMessage="https://twitter.com/intent/tweet?text=It%20is%20currently%20" + weatherTemp + "here. %20To%20get%20your%20weather%20visit: https://v23weather.netlify.app/"
  document.getElementById('shareTweet').href = tweetMessage;
}
