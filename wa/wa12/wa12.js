const newBtn = document.querySelector('#js-new-quote').addEventListener('click', getQuote);
const answerBtn = document.querySelector('#js-tweet').addEventListener('click', displayAnswer);

const questionTxt = document.querySelector('#js-quote-text');
let answerTxt = document.querySelector('#js-answer-text');
let title = document.querySelector('#title');
let answer = '';

// this is the endpoint for the API that we want to get a reponse from
const endpoint = 'https://poetrydb.org/random';

async function getQuote() {
   // try -> tries something; if it returns an error, it puts us into the catch block
    try {
        const response = await fetch(endpoint);
        // if !response.ok is "if the response ISN'T okay (status code 200)"
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json[0]["title"]);
        // JSON is a dictionary, which is like a list; we call specific pieces of information out based on the 'key' associated with that value
        displayQuote(json[0]['title']);
        
        //answer = json['answer'];
        //answerTxt.textContent = '';
    }
    catch(err) {
        console.log(err);
        alert('Failed to fetch new quote');
    }
}

// this function shows the question
function displayQuote(question) {
    title.textContent = question;
}

// this function shows the answer
function displayAnswer() {
    answerTxt.textContent = answer;
}

// we run getQuote once when the script first loads to populate a question
// when the page is loading
getQuote();
