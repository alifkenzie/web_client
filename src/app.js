const page = require("page");
// memanggil function page3 dari file yang ada di src/page3/index.js
const tanya_page = require("./tanya_page/index")
const mainpage = require("./main_page/index")
const configpage = require("./configpage/index")




page('/', mainpage)
// jika alamat /page3 di buka maka panggil function page3
page('/tanya_page', tanya_page)
page('/configpage',configpage)
page()