const quote= document.querySelector('.quotes');
const author =document.querySelector('.author');
const newbtn = document.querySelector('.newquote');
const container =document.querySelector('.container');
const loader =document.querySelector('.loader');
const loaderdisplay=()=>{
    loader.classList.remove('hidden')
    container.hidden = true;
    loader.hidden = false;
    
}
const removeLoadingSpinner=()=>{
    loader.classList.add('hidden')
    if(!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}

async function getRandomQuote(){
    loaderdisplay();
    const proxyUrl = 'https://shielded-thicket-27086.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl+apiUrl);
        const data = await response.json();
        if(data.quoteAuthor=== '') {
            author.innerText='Unkwown';
        }else{
            author.innerText=data.quoteAuthor;
        }
        if(data.quoteText.length > 120){
            quote.classList.add('long-quote')
        }else{
            quote.classList.remove('long-quote')
        }
        quote.innerText=data.quoteText;
        removeLoadingSpinner();
    }catch(error){
    getRandomQuote()
}
}
newbtn.addEventListener('click', getRandomQuote);
function tweetQuote() {
    const quotes = quote.innerText;
    const authors = author.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quotes} - ${authors}`;
    window.open(tweetUrl, '_blank');
}
const twitterbtn =document.querySelector('.twitter')
twitterbtn.addEventListener('click',tweetQuote);