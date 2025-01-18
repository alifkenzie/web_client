const page = require("page");
const page1 = require("./page1/index")
const page2 = require("./page2/index")
// memanggil function page3 dari file yang ada di src/page3/index.js
const page3 = require("./page3/index")
const mainpage = require("./main_page/index")



page('/', mainpage)
page('/page1', page1)
page('/page2', page2)
// jika alamat /page3 di buka maka panggil function page3
page('/page3', page3)

page()