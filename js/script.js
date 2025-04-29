// Geolocation API
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    document.getElementById("location").textContent = 
      `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
  }, () => {
    document.getElementById("location").textContent = "Location access denied.";
  });
}
// Drag and Drop
function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
// Web Storage
function saveData() {
  const name = document.getElementById("username").value;
  localStorage.setItem("username", name);
  displayName();
}
function displayName() {
  const storedName = localStorage.getItem("username");
  if (storedName) {
    document.getElementById("stored-name").textContent = `Welcome back, ${storedName}!`;
  }
}
displayName();
// Web Workers
let w;

function startWorker() {
  const x = document.getElementById("result");
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("js/workers.js");
    }
    w.onmessage = function(event) {
      x.innerHTML = event.data;
    };
  } else {
    x.innerHTML = "Sorry! No Web Worker support.";
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}
function resetWorker() {
  stopWorker(); // Stop the worker if running
  document.getElementById("result").innerHTML = ""; // Clear the output
}

// SSE
const x = document.getElementById("sse-output");
// Check browser support for SSE
if(typeof(EventSource) !== "undefined") {
  var source = new EventSource("php/sse.php");
  source.onmessage = function(event) {
    x.innerHTML += event.data + "<br>";
  };
} else {
  x.innerHTML = "Sorry, no support for server-sent events.";
}

// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
// Live Clock
setInterval(() => {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}, 1000);
// Audio Mute Toggle
function toggleMute() {
  const audio = document.getElementById("bgMusic");
  audio.muted = !audio.muted;
}