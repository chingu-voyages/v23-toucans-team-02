// local storage toggled & assign its dark class
$('body, #now, #header').toggleClass(localStorage.toggled);

function darkMode() {
if (localStorage.toggled != 'dark') {
  $('body, #now, #header').toggleClass('dark', true);
  localStorage.toggled = "dark";
} else {
  // untoggle class on the body & clear local storage
  $('body, #now, #header').toggleClass('dark', false);
  localStorage.toggled = "";
 }
}
 // mode button - ON , OFF
if ($('body, #now, #header').hasClass('dark')) {
   $('#checkBox').prop("checked", true)
} else {
  $('#checkBox').prop("checked", false)
}