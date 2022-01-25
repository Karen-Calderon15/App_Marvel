const APIKEY = "5e67c4761cec01aa6a911fcc8901a81e"; // Public Key
const HASH = "df8cde884f06db04076fa7080cb93f20"; // md5(ts+privateKey+publicKey) -> https://www.md5hashgenerator.com
const TS = "1";
const URL = "https://gateway.marvel.com/v1/public/";
//const URL = "data/";


const CLIENT = {
    sendRequest : async (path) => {
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
}

export default CLIENT
