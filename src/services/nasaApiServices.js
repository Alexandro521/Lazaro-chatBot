const {default:axios} = require('axios')
const { translate } = require('free-translate');

const toEsp =  async (txt) => await translate(txt, { from: 'en', to: 'es' });


const API_KEY = '0Dj5RTlgbSkFzkgxFSwMrg7MBQrd8cJd9XTRq4iB'

class nasa{
    static async PictureOfTheDay(){
        const request = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=25`)
        const random = (limit)=> Math.floor(Math.random()*(limit-1))
        const results = request.data[random(request.data.length)];
        console.log(results)
        return {
            title: results.title,
            description: results.explanation,
            imageUrl: results.hdurl
        }   
    }

}
module.exports.nasa = nasa