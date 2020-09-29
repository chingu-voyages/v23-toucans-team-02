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
