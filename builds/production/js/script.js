

//-------------------------------
var listener = new webspeech.Listener();
// listener.listen("en", function(text) {
//   document.getElementById("text").value = text;
// });

var speaker = new webspeech.Speaker();
document.getElementById("read").onclick = () => {
  console.log('foo');
  speaker.speak("en", document.getElementById("text").value);
}
console.log();
