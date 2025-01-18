async function getdata(){
  const url = "/api/predict/jam berapa" ;
  let response =  await fetch(url)
  let hasil = await response.json();
  return hasil;

}
function page2() {
  let main = document.querySelector("#main");
  main.innerHTML = `
    <button class="btn" id="test">
        Tanya    
    </button>
    `
    let tanya = document.querySelector("#test")
    tanya.onclick = async () => {
      let hasil = await getdata()
      console.log(hasil);

    }
}
module.exports = page2;
