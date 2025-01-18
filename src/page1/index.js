// ini adalah fetch untuk ngambil url
// predict yang berfungsi tempat bertanya dan mendapatkan jawabannya
async function getData(tanya) {
  const url = "/api/predict/" + tanya;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

function page1() {
  // memilih / menghubungkan elemen dengan atribut id "main"
  let main = document.querySelector("#main");
  // membuat button dengan atribut class dan id
  main.innerHTML = `
    <button class="btn" id="btn-start">
        Tanya    
        </button>
    `;
  // membuat variabel Web speech API
  const speech = new SpeechSynthesisUtterance();
  // kecepatan suara
  speech.rate = 1.2;

  /* start */
  /*
  membuat function untuk mendeteksi suara yg berbahasa indonesia
  jika ada suara bhs id maskan ke variabel speech.voice
  */
  let voice;
  const synth = window.speechSynthesis;
  synth.onvoiceschanged = function () {
    const voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      //console.log(voices[i])
      if (voices[i].localService) {
        //console.log(voices[i])
      }

      //console.log('voice ', voices[i].lang)
      if (voices[i].lang.includes("ID")) {
        console.log("voice ", voices[i]);
        voice = voices[i];
        // found
        speech.voice = voice;
      }
    }
  };
  /* selesai */

  /* membuat recognition*/
  const recognition = new window.webkitSpeechRecognition();
  // di set bhs id
  recognition.lang = "id-ID";

  // menghubungkan elemen dgn atribut id btn-start
  let tanya = document.querySelector("#btn-start");
  // membuat button tanya bisa diklik dan memulai recognition 
  // dgn ditandai simbol rekam di browser
  tanya.onclick = () => {
    recognition.start();
  };
  // jika recognition berhasil 
  recognition.onresult = async (event) => {
    // hasil dari recogniton di simpan ke variabel text
    const text = event.results[0][0].transcript;

    // kalau textnya ada
    if (text) {
      // mengambil isi data dari predict dengan memberikan pertanyaan(text)
      let json = await getData(text);
      // jika json.answer ada berarti jawabannya ada
      if (json.answer) {
        // memberikan jawabannya terhadap speech.text
        speech.text = json.answer;
        // menampilkan / memunculkan suara dari teks
        synth.speak(speech);
      }else{// jika tidak ada 
        speech.text = "maaf saya tidak tahu jawabannya";
        synth.speak(speech);
      }
      console.log(json);
    }else {
      // jika tidak ada  kasih text di bawah
      speech.text ="Mohon di ulangi";
      synth.speak(speech);
  
    }
  };
}
module.exports = page1;
