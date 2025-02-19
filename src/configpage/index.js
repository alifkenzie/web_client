const page = require("page")

function configpage(){
    let main = document.querySelector("#main")
    main.innerHTML = `
    <div id="container">
        <button id="load">
        Load Languange
        </button>
            <div id="space">
                
            </div>
    </div>
    `
const load = document.querySelector("#load")
const space = document.querySelector("#space")

load.onclick = () => {
    let voice;
    const speech = new SpeechSynthesisUtterance();
    const synth = window.speechSynthesis;
      // jika ada voice terinisialisasi
      synth.pause();
      synth.resume();
      synth.onvoiceschanged = () => {
        // mengeluarkan lang voice di browser
        const voices = synth.getVoices();
        let str = "<table>"
        for (let i = 0; i < voices.length; i++) {
            str = str + "<tr>"
            str = str + "<td>" + voices[i].name + "</td>"
            str = str + "<td>" + voices[i].lang + "</td>"
            str = str + "</tr>"
        }

        str = str + "</table"
        let space = document.querySelector("#space")
        space.innerHTML = str;
      };
  
    
}



}
module.exports = configpage