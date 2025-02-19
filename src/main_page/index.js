const page = require("page");

function mainpage(){
    let main = document.querySelector("#main")
    main.innerHTML = `
        <div id="container-main">
            <div id="atas">
              <img  id="img" src="https://smptridayatunasbangsa.sch.id/wp-content/uploads/2023/07/smp.png">
              </img>
            </div>
            <div id="bawah">
                <div id="kiri">
                  <button class="btn" id="btn-page3">
                  Start   
                  </button>
                </div>
                <div id="kanan">
                  <button id="config">
                  Settings
                  </button>
                </div>
            </div>
        </div>
        
    `
    /*
<img  id="img" src="https://smptridayatunasbangsa.sch.id/wp-content/uploads/2023/07/smp.png">
        </img>
        <button class="btn" id="btn-page3">
        Start   
        </button>
        <button id="config">
        Settings
        </button>
    */
let config = document.querySelector("#config");
config.onclick = () => {
    page ("/configpage")
}


let Mulai = document.querySelector("#btn-page3");
Mulai.onclick = () => {
    page ("/tanya_page")
}

}

module.exports = mainpage