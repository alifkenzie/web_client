const { marked } = require('marked');
const page = require("page");
// ini adalah fetch untuk ngambil url
// predict yang berfungsi tempat bertanya dan mendapatkan jawabannya
async function getData(tanya) {
  const url = "/api/predict2/" + tanya;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // jika tidak ok ini res-nya
      throw new Error(`Response status: ${response.status}`);
    }
    // jika ok masukkan ke dalam variabel json dan dikembalikan
    // ke pemanggil
    // mengembalikan respon dari backend berupa string
    const teks = await response.text();
    // diubah menjadi json
    let jsn = JSON.parse(teks);
    return jsn;

  } catch (error) {
    console.error(error.message);
  }
}

function tanya_page() {
  // memilih / menghubungkan elemen dengan atribut id "main"
  let main = document.querySelector("#main");
  // membuat button dengan atribut class dan id
  main.innerHTML = /* HTML */ `
    <div id="backpage3">
      <div class="judul">
          Chatbot Tridaya
      </div>

    <div id="scroll">


      <div id="images">
      </div>

      <div id="md">
      </div>

    </div>

      <div id="footer">
        <div id="group-btn">
          <button class="btn" id="btn-start">
            <div id="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>microphone-question-outline</title><path d="M14.3 11C14.3 14 11.76 16.1 9 16.1S3.7 14 3.7 11H2C2 14.41 4.72 17.23 8 17.72V21H10V17.72C13.28 17.23 16 14.41 16 11M7.8 4.9C7.8 4.24 8.34 3.7 9 3.7S10.2 4.24 10.2 4.9L10.19 11.1C10.19 11.76 9.66 12.3 9 12.3S7.8 11.76 7.8 11.1M9 14C10.66 14 12 12.66 12 11V5C12 3.34 10.66 2 9 2S6 3.34 6 5V11C6 12.66 7.34 14 9 14M20.5 14.5V16H19V14.5H20.5M18.5 9.5H17V9C17 7.34 18.34 6 20 6S23 7.34 23 9C23 9.97 22.5 10.88 21.71 11.41L21.41 11.6C20.84 12 20.5 12.61 20.5 13.3V13.5H19V13.3C19 12.11 19.6 11 20.59 10.35L20.88 10.16C21.27 9.9 21.5 9.47 21.5 9C21.5 8.17 20.83 7.5 20 7.5S18.5 8.17 18.5 9V9.5Z" /></svg> 
            </div>
          </button>
          <button class="btn" id="btn-stop">
            End
          </button>
        </div>
        <div class="keterangan">
          <div>
            Karya  by Alif
          </div>
          <div> 
            Kelas 2 SMP Tridaya Tunas Bangsa
          </div>
          <div>
            Tgl 12 Januari 2025
          </div>
        </div>
      </div>
    </div>

      `;

  // membuat variabel Web speech API
  const speech = new SpeechSynthesisUtterance();
  // kecepatan suara
  speech.rate = 1.0;

  /* start */
  /*
    membuat function untuk mendeteksi suara yg berbahasa indonesia
    jika ada suara bhs id masukan ke variabel speech.voice
    */
  let voice;
  const synth = window.speechSynthesis;
  // jika ada voice terinisialisasi
  synth.onvoiceschanged = function () {
    // mengeluarkan lang voice di browser
    console.log('masuk onvoiceschange')
    const voices = synth.getVoices();
    // melakukan looping sebanyak jumlah lang-nya
    for (let i = 0; i < voices.length; i++) {
      // kalau menemukan lang yg berisi tulisan "ID" maka masukan ke dalam
      // file speech.voice
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
  // di set supaya bisa menerjemahkan (suara-teks )bhs id
  // hanya bisa 1 bhs saja
  recognition.lang = "id-ID";

  // menghubungkan elemen dgn atribut id btn-start
  let tanya = document.querySelector("#btn-start");
  // membuat button tanya bisa diklik dan memulai recognition
  // dgn ditandai simbol rekam di browser
  tanya.onclick = () => {
    let icon = document.querySelector("#icon");
    icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>record-circle</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" /></svg>
      `;
    icon.style.fill = "red";
    recognition.start();
  };
  tanya.ontouchstart = () => {
    let btn = document.querySelector("#btn-start");
    btn.style.backgroundColor = "green";
    let icon = document.querySelector("#icon");
    icon.style.fill = "yellow";
  };
  tanya.ontouchend = () => {
    let btn = document.querySelector("#btn-start");
    btn.style.backgroundColor = "#16404D";
    let icon = document.querySelector("#icon");
    icon.style.fill = "white";
  };
  const End = document.querySelector("#btn-stop")
  End.onclick = () => {
      page ("/")
  }
  // jika recognition/penerjemahan dari suara ke teks berhasil
  // 
  recognition.onresult = async (event) => {
    let icon = document.querySelector("#icon");
    icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>microphone-question-outline</title><path d="M14.3 11C14.3 14 11.76 16.1 9 16.1S3.7 14 3.7 11H2C2 14.41 4.72 17.23 8 17.72V21H10V17.72C13.28 17.23 16 14.41 16 11M7.8 4.9C7.8 4.24 8.34 3.7 9 3.7S10.2 4.24 10.2 4.9L10.19 11.1C10.19 11.76 9.66 12.3 9 12.3S7.8 11.76 7.8 11.1M9 14C10.66 14 12 12.66 12 11V5C12 3.34 10.66 2 9 2S6 3.34 6 5V11C6 12.66 7.34 14 9 14M20.5 14.5V16H19V14.5H20.5M18.5 9.5H17V9C17 7.34 18.34 6 20 6S23 7.34 23 9C23 9.97 22.5 10.88 21.71 11.41L21.41 11.6C20.84 12 20.5 12.61 20.5 13.3V13.5H19V13.3C19 12.11 19.6 11 20.59 10.35L20.88 10.16C21.27 9.9 21.5 9.47 21.5 9C21.5 8.17 20.83 7.5 20 7.5S18.5 8.17 18.5 9V9.5Z" /></svg> 
      `;
    icon.style.fill = "white";
    // hasil dari recogniton di simpan ke variabel text
    const text = event.results[0][0].transcript;

    // kalau textnya ada
    if (text) {
      // mengambil isi data dari predict dengan memberikan pertanyaan(text)
      let hasil = await getData(text);
      speech.text = hasil.comment;
      // memanggil elemen yang memiliki atribut bernma md
      const md = document.querySelector("#md");
      // ubah hasil konten menjadi markdown dan masuk ke dalam innerhtml
      md.innerHTML = marked.parse(hasil.konten)
      // menampilkan / memunculkan suara dari teks
      synth.speak(speech);

      const img = document.querySelector("#images");
      if (hasil.images.length > 0){
        // sebagai tempat penampung 
        let listimages = ""
        for (let r = 0 ; r<hasil.images.length ; r++){
          listimages = listimages + `
          <img class="imge" src="${hasil.images[r]}">

          </img>
        `
        }
        img.innerHTML = listimages;
        console.log("listimages ", listimages);
      } else (
        img.innerHTML = ""
      )
    } else {
      // jika tidak ada  kasih text di bawah
      speech.text = "Mohon di ulangi";
      synth.speak(speech);
    }
  };
}
module.exports = tanya_page;
