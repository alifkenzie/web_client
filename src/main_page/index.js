const page = require("page");

function mainpage(){
    let main = document.querySelector("#main")
    main.innerHTML = `
    <button class="btn" id="btn-page1">
        Go to page1    
        </button>
        <button class="btn" id="btn-page2">
        Go to page2    
        </button>
        <button class="btn" id="btn-page3">
        Go to page3    
        </button>
    `

    let btn_page1 = document.querySelector("#btn-page1");
btn_page1.onclick = () => {
    page ('/page1')
}

let btn_page2 = document.querySelector("#btn-page2");
btn_page2.onclick = () => {
    page ("/page2")
}

let btn_page3 = document.querySelector("#btn-page3");
btn_page3.onclick = () => {
    page ("/page3")
}
}
module.exports = mainpage