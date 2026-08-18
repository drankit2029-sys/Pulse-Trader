export async function getSymbolPrice(symbol){

const apiKey = "d9ul9vhr01qs9cmda7d0d9ul9vhr01qs9cmda7dg"

const target_url =`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`

const getData = await fetch(target_url);
const data = await getData.json();

return data.c

}