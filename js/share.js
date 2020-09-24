function screenCapture() {
  html2canvas(document.body).then(function(canvas) {
    allowTaint = true;
    // Export the canvas to its data URI representation
    var base64image = canvas.toDataURL("image/png");

    // Open the image in a new window
    window.open(base64image, "_blank");
  });
}
