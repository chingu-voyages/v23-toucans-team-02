const date = document.getElementById('date');
const time = document.getElementById('time');

const now = new Date(Date.now());
const dateOptions = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
const timeOptions = { hour: 'numeric', minute: '2-digit' };

// implementation open to locale-dependent datetime display
date.textContent = now.toLocaleDateString('en-US', dateOptions);
time.textContent = now.toLocaleTimeString('en-US', timeOptions);