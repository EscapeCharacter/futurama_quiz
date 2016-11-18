var baseUrl = "https://mockapi-unadjzzymg.now.sh";
var questions;
var userInfo;
var quizInfo = {
    whichQuestion: 0
    , passScore: 70
}
var questionsAjax = {
    url: baseUrl + '/questions?_limit=5'
    , method: 'GET'
};
var userAjax = {
    url: baseUrl + '/users'
    , method: 'GET'
};
$.when($.ajax(userAjax), $.ajax(questionsAjax)).done(function (u, q) {
    questions = q[0];
    userInfo = u[0][0];
    console.log(u);
    init();
}).fail(function (err) {
    console.log(err);
    console.log('Seems we have a ' + err.status + ' on one or more ajax requests');
});

function init() {
    $('#userName').text(userInfo.userName);
    userInfo['userScore'] = 0;
    quizInfo.whichQuestion = 0;
    // update user display || possibly a method
    updateDisplay();
    // display next question
    displayNextQuestion();
    // display next answers
    displayNextPossibleAnswers();
    // listen for click on answer button
    addEventListeners();
}
// write user display here
function updateDisplay() {
    $('#userScore').html(userInfo.userScore);
    $('#userScore').text(userInfo.userScore + ' out of ' + questions.length);
    console.log(userInfo);
    console.log(userScore);
};
// write next question here
function displayNextQuestion() {
    console.log(questions);
    $('#questionDisplay').html(questions[quizInfo.whichQuestion].question);
}
// display next answers here
function displayNextPossibleAnswers() {
    var answersString = '';
    //    $('#possibleAnswersDisplay').html(questions[quizInfo.whichQuestion].displayNextPossibleAnswers);
    //    quizInfo.displayNextPossibleAnswers;
    for (var i = 0; i < questions[quizInfo.whichQuestion].possibleAnswers.length; i++) {
        //    // dont forget to change the POSSIBLE ANSWER to the actual possible answer.
        answersString += '<label class="col-xs-6">';
        answersString += '<input type="radio" name="answers" value="' + questions[quizInfo.whichQuestion].possibleAnswers[i] + '" />';
        answersString += '<span>' + questions[quizInfo.whichQuestion].possibleAnswers[i] + '</span>';
        answersString += '</label>';
        //// this is how you get the value out of a radio button that is currently selected
    }
    $('#possibleAnswersDisplay').html(answersString);
}
// event listener function for answer
function addEventListeners() {
    $('#finalAnswer').on('click', checkAnswers);
}
// check answer
function checkAnswers() {
    // if correct
    if ($("input[type=radio]:checked").val() == questions[quizInfo.whichQuestion].correctAnswer) {
        userInfo.userScore++;
        alert('Correct!')
            // display message
            // update score
            // update screen
    }
    else {
        alert('Wrong, dummy!');
        // if incorrect
        // display message
        // update screen
    }
    if(gameIsOver()) {
        alert('Game is over');
       
        init();
    }else{
        // if the game isnt over yet
        quizInfo.whichQuestion++;
        displayNextQuestion();
        displayNextPossibleAnswers();
        updateDisplay();
    }
   
}

function gameIsOver() {
    if (quizInfo.whichQuestion == questions.length -1) {
        return true;
    }
    else {
        return false;
    }
}