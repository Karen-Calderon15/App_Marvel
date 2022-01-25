const APIKEY = "5e67c4761cec01aa6a911fcc8901a81e"; // Public Key
const HASH = "df8cde884f06db04076fa7080cb93f20"; // md5(ts+privateKey+publicKey) -> https://www.md5hashgenerator.com
const TS = "1";
const URL = "https://gateway.marvel.com/v1/public/";
//const URL = "data/";

async function sendRequest(path) {
  // 1. Hacer Peticion
  const response = await fetch(
    URL +
      path +
      "?ts=" +
      TS +
      "&apikey=" +
      APIKEY +
      "&hash=" +
      HASH
  );
  // Validar la respuesta
  if (!response.ok) throw Error(response.statusText);
  // Extraer la información
  const json = await response.json();
  return json.data.results;
}


// Crear la funcion main para consumir el recurso...
async function main() {
  const comics = await sendRequest("comics");
  console.log(comics);
  //PROCESAR INFORMACION

  const container = document.getElementById(
    "card_container"
  );

  comics.forEach((comic) => {
    const template = document.querySelector(
      "#card_template"
    );
    const clone = template.cloneNode(true);
    clone.removeAttribute("style"); // removiendo el diplay:none
    // console.log(clone.children[0].children[1].children[0]);// H5
    // IMAGEN
    //VALIDACION DE COMICS SIN IMAGEN
    
    
    if (
      comic.thumbnail.path.includes("image_not_available")
    ) {
      return;
    
    }
    //CARGAR IMAGEN
    clone
      .querySelector(".comic_img")
      .setAttribute(
        "src",
        `${comic.thumbnail.path}.${comic.thumbnail.extension}`
      );
    // TITULO
    clone.querySelector(".comic_name").textContent =
      comic.title;
    
    //SETEAR PRECIO
    let origin_price = 
    comic.prices[0].price == 0.00 
    ? 2.99 
    : comic.prices[0].price; //TERNARIO
    //SETEAR PRECIO ORIGINAL
    clone.querySelector(".comic_ori_price").textContent =
    origin_price;

    //SETEAR PRECIO TOTAL
    clone.querySelector(".comic_price").textContent = (
      origin_price-2.0
    ).toFixed(2);
    
    //ACCION AL BOTON
    clone
    .querySelector(".comic_btn")
    .addEventListener("click", () => {
      window.localStorage.setItem("product_id", comic.id);
      window.open("products.html", "_blank");
    });

    container.appendChild(clone);
  });
}
main();


// OFFLIN

// const URL = "data/";
// async function sendRequest(path) {
//   // 1. Hacer Peticion
//   const response = await fetch(URL + path + ".json");
//   // Validar la respuesta
//   if (!response.ok) throw Error(response.statusText);
//   // Extraer la información
//   const json = await response.json();
//   console.log(json);
//   return json.data.results;
// }