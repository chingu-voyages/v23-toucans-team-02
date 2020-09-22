function readUrlParams() {
  const queryString = document.URL;
  console.log("URL: " + queryString);

  // IF STATEMENT - if it was shared then execute this function

  var posLat = queryString.search("Lat");
  var posLog = queryString.search("Log");

  document.getElementById("check-input-lat").value = queryString.slice(posLat, posLog);
  document.getElementById("check-input-log").value = queryString.slice(posLog, 6);


}

function sendUrlParams() {
  var userLog = "Log" + document.getElementById("check-input-log").value;
  var userLat = "Lat" + document.getElementById("check-input-lat").value;

  // BUILD URL TO SHARE
  const queryString = document.URL + userLat + userLog;
  console.log(queryString);


}
