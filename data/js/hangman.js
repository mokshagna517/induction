var questions = [{
  question: "Which of the following areas does P&BM not overlook?",
  choices: ["Vendor Management","Risk Assurance and Compliance","Workforce Strategy Program","IT Management"],
  correctAnswer: 3
}, {
  question: "Whom does Head-Performance and Business Management report to?",
  choices: ["Head-Finance","Head-Technology","Head-Business Enablement and Records Management","Head-People and Engagement"],
  correctAnswer: 1
}, {
  question: "Which of these is a part of People and Engagement?",
  choices: ["Culture and Mobility","Portfolio Rebalancing","Supplier Management","Capability"],
  correctAnswer: 0
}, {
  question: "Which of the following are not external stakeholders for Performance and Business Management?",
  choices: ["European Banking Authority","Finance Change","Bank of England","Local country regulations"],
  correctAnswer: 1
}, {
  question: "Which of the following are not internal stakeholders for Performance and Business Management?",
  choices: ["Global Financial Services","Divisional and Group Treasury","CFO Office","Bank of England"],
  correctAnswer: 3
}];

  /*var questions=[];
  function readFile(file)
  {
      var f = new XMLHttpRequest();
      f.open("GET", 'questions.json', false);
      f.onreadystatechange = function ()
      {
          if(f.readyState === 4)
          {
              if(f.status === 200 || f.status == 0)
              {
                  questions = JSON.parse(f.responseText);
                  //alert(questions); //to see if contents are read
              }
          }
      }
      f.send(null);
  }
  
  readFile('questions.json');*/

var questionCounter = 0; //Tracks question number
var selections = []; //Array containing user choices
var quiz = $('#quiz'); //Quiz div object

// Display initial question
displayNext();

// Click handler for the 'next' button
$('#next').on('click', function (e) {
  e.preventDefault();
  
  // Suspend click listener during fade animation
  if(quiz.is(':animated')) {        
    return false;
  }
  choose();
  
  // If no user selection, progress is stopped
  if (isNaN(selections[questionCounter])) {
    alert('Please make a selection!');
  } else {
    questionCounter++;
    displayNext();
  }
});

// Click handler for the 'prev' button
$('#prev').on('click', function (e) {
  e.preventDefault();
  
  if(quiz.is(':animated')) {
    return false;
  }
  choose();
  questionCounter--;
  displayNext();
});

// Click handler for the 'Start Over' button
$('#start').on('click', function (e) {
  e.preventDefault();
  
  if(quiz.is(':animated')) {
    return false;
  }
  questionCounter = 0;
  selections = [];
  displayNext();
  $('#start').hide();
});

// Animates buttons on hover
$('.button').on('mouseenter', function () {
  $(this).addClass('active');
});
$('.button').on('mouseleave', function () {
  $(this).removeClass('active');
});

// Creates and returns the div that contains the questions and 
// the answer selections
function createQuestionElement(index) {
  var qElement = $('<div>', {
    id: 'question'
  });
  
  var header = $('<h2>Question ' + (index + 1) + ':</h2>');
  qElement.append(header);
  
  var question = $('<p>').append(questions[index].question);
  qElement.append(question);
  
  var radioButtons = createRadios(index);
  qElement.append(radioButtons);
  
  return qElement;
}

// Creates a list of the answer choices as radio inputs
function createRadios(index) {
  var radioList = $('<ul>');
  var item;
  var input = '';
  for (var i = 0; i < questions[index].choices.length; i++) {
    item = $('<li>');
    input = '<input type="radio" name="answer" value=' + i + ' />';
    input += questions[index].choices[i];
    item.append(input);
    radioList.append(item);
  }
  return radioList;
}

// Reads the user selection and pushes the value to an array
function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

// Displays next requested element
function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();
    
    if(questionCounter < questions.length){
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }
      
      // Controls display of 'prev' button
      if(questionCounter === 1){
        $('#prev').show();
      } else if(questionCounter === 0){
        
        $('#prev').hide();
        $('#next').show();
      }
    }else {
      var scoreElem = displayScore();
      quiz.append(scoreElem).fadeIn();
      $('#next').hide();
      $('#prev').hide();
      $('#start').show();
      updateScore();
    }
  });
}

// Computes score and returns a paragraph element to be displayed
function displayScore() {
  var qscore = $('<p>',{id: 'question'});
  
  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i] === questions[i].correctAnswer) {
      numCorrect++;
    }
  }
  score = score + (numCorrect*10)
  qscore.append('You got ' + numCorrect + ' questions out of ' +
               questions.length + ' right!!! Your final score is: ' + score);
  return qscore;
}



var programming_languages=[];
function readFile1(file)
{
    var f = new XMLHttpRequest();
    f.open("GET", 'array.json', false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                programming_languages = JSON.parse(f.responseText);
                //alert(programming_languages); //to see if contents are read
            }
        }
    }
    f.send(null);
}

readFile1('array.json');

// var programming_languages = [
// 	"python",
// 	"javascript",
// 	"mongodb",
// 	"json",
// 	"java",
// 	"html",
// 	"css",
// 	"c",
// 	"csharp",
// 	"golang",
// 	"kotlin",
// 	"php",
// 	"sql",
// 	"ruby"
// ]

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var myObj = JSON.parse(this.responseText);
//     document.getElementById("demo").innerHTML = myObj.name;
//     var programming_languages = myObj.name;
//   }
// };
// xmlhttp.open("GET", "./data.txt", true);
// xmlhttp.send();

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let score = 0;
let qcorrect = 0;
let qwrong = 0;
let wordStatus = null;

function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

var vid = document.getElementById("myVideo");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var qspan = document.getElementsByClassName("qclose")[0];
var qmodal = document.getElementById("qmyModal");


vid.autoplay = true;
vid.load();

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;

    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
    
    // modal.style.display = "block";
    // span.onclick = function() {
    // modal.style.display = "none";
    //   }
    
    // if (mistakes==1){
    //   document.getElementById('imgrt').src = "./images/cont1.jpg";  
    // vid.src = ""}
    // if (mistakes==2){
    //   document.getElementById('imgrt').src = "./images/cont2.jpg";  
    //   vid.src = ""}
    // if (mistakes==3){
    //   vid.src = "./videos/chitra.mp4";  
    //   document.getElementById('imgrt').src = ""}
// window.onclick = function(event) {//to close modal by clicking anywhere outside it
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}
var word = 0;
function checkIfGameWon() {
  
  if (wordStatus === answer) {

  score = score + ((maxWrong-mistakes)*2);
  updateScore();
  modal.style.display = "block";
  span.onclick = function() {
  modal.style.display = "none";
    }
    word = word+1;
    if (word ==1){
      document.getElementById('imgrt').src = "./ppts/PBM ppt/s1.jpg";  
      vid.src = ""
    }
    else if (word==2){
      document.getElementById('imgrt').src = "./ppts/PBM ppt/s2.jpg";  
      vid.src = ""
    }
    else if (word==3){
      document.getElementById('imgrt').src = "";  
      vid.src = "";
      document.getElementById("flip1").style.display = "inline-block" ;
      document.getElementById("flip2").style.display = "inline-block" ;
      document.getElementById("flip3").style.display = "inline-block" ;
      document.getElementById("flip4").style.display = "inline-block" ;
      document.getElementById("flip5").style.display = "inline-block" ;
      document.getElementById("flip6").style.display = "inline-block" ;
      document.getElementById("flip7").style.display = "inline-block" ;
    }  
    else if (word==4){
      document.getElementById('imgrt').src = "./ppts/PBM ppt/s4.jpg";  
      vid.src = ""
    }
    else if (word==5) {
      document.getElementById('imgrt').src = ""; 
      document.getElementById("flip1").style.display = "none" ;
      document.getElementById("flip2").style.display = "none" ;
      document.getElementById("flip3").style.display = "none" ;
      document.getElementById("flip4").style.display = "none" ;
      document.getElementById("flip5").style.display = "none" ;
      document.getElementById("flip6").style.display = "none" ;
      document.getElementById("flip7").style.display = "none" ; 
      vid.src = "./videos/chitra.mp4"}
    else{
      modal.style.display = "none";

      qmodal.style.display = "block";
      qspan.onclick = function() {
      qmodal.style.display = "none";
      }
    }
    reset();

  }
  // document.getElementById('keyboard').innerHTML = 'You Won!!!';
}
// }
function inc_score(qcorrect){
    // qcorrect+=1;
    score= score + qcorrect*10;
}

function dec_score(qwrong){
  // qwrong+=1;
  score = score - qwrong*3;
}

function checkIfGameLost() {
  
  if (mistakes === maxWrong) {
    score = score + 0;
    updateScore();
    modal.style.display = "block";
    span.onclick = function() {
    modal.style.display = "none";
      }
    word = word+1;
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    if (word ==1){
      document.getElementById('imgrt').src = "./ppts/PBM ppt/s1.jpg";  
      vid.src = ""}
    else if (word==2){
      document.getElementById('imgrt').src = "./ppts/PBM ppt/s2.jpg";  
      vid.src = ""}
    else if (word==3){
      document.getElementById('imgrt').src = "";  
      vid.src = "";
      document.getElementById("flip1").style.display = "inline-block" ;
      document.getElementById("flip2").style.display = "inline-block" ;
      document.getElementById("flip3").style.display = "inline-block" ;
      document.getElementById("flip4").style.display = "inline-block" ;
      document.getElementById("flip5").style.display = "inline-block" ;
      document.getElementById("flip6").style.display = "inline-block" ;
      document.getElementById("flip7").style.display = "inline-block" ;

    }  
    else if (word==4){
      document.getElementById('imgrt').src = "./ppts/PBM ppt/s4.jpg";  
      document.getElementById("flip1").style.display = "none" ;
      document.getElementById("flip2").style.display = "none" ;
      document.getElementById("flip3").style.display = "none" ;
      document.getElementById("flip4").style.display = "none" ;
      document.getElementById("flip5").style.display = "none" ;
      document.getElementById("flip6").style.display = "none" ;
      document.getElementById("flip7").style.display = "none" ; 
      vid.src = ""}
    else if (word==5) {
      document.getElementById('imgrt').src = "";  
      document.getElementById("flip1").style.display = "none" ;
      document.getElementById("flip2").style.display = "none" ;
      document.getElementById("flip3").style.display = "none" ;
      document.getElementById("flip4").style.display = "none" ;
      document.getElementById("flip5").style.display = "none" ;
      document.getElementById("flip6").style.display = "none" ;
      document.getElementById("flip7").style.display = "none" ;
      vid.src = "./videos/chitra.mp4"}
    else{
      modal.style.display = "none";
      vid.src = ""

      qmodal.style.display = "block";
      qspan.onclick = function() {
      qmodal.style.display = "none";
      }
    }
    reset();
    // document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
      document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateScore() {
  document.getElementById('uscore').innerHTML = score;
}
function quizScore() {
  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i] === questions[i].correctAnswer) {
      numCorrect++;
    }
  }
  
  return (numCorrect*10);
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  // qmodal.style.display = "block";
  //     qspan.onclick = function() {
  //     qmodal.style.display = "none";
  //     }
  
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
