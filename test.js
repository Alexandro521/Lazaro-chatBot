

function s(message=" "){
const msg = "!lyricSearch "+message 
const regex = /(!lyricSearch)(.+)\w+/;
const text = msg.match(regex);
console.log(text[2]);

}
console.clear()
s("hola") 