const axios = require('axios')
async function search(searchText){

    const response = await axios.get('http://localhost:1024/services/search?q='+searchText)
    const number = Math.floor(Math.random()*20-1);
    const  texto = response.data.object[number];
    if (texto) {
        return {img:texto.url,title: texto.title}
    } else {
         return  {img:'https://img.freepik.com/vector-premium/ups-pagina-error-404-no-encontrada-ilustracion-concepto-natural-pagina-inicio-que-falta-web_697669-2.jpg',
        title: 'Ups tu imagen no pudo ser procesada, por favor Intenta nuevamente'}

    }
}
module.exports = {search}