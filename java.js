

var questions = [
    {
        question: "1. What year did Ford win Lemans ?",
        choices: ["1964", "1963", "1964", "1965"],
        correctAnswer: 3,
    }, {
        question: "2. What is a carberator do?",
        choices: ["Makes gas", "Distributes fire", "Mixes air with fuel", "Nothing"],
        correctAnswer: 2
    }, {
        question: "3. What year was the first Ford Mustang produced?",
        choices: ["1964", "1965", "1967", "1968"],
        correctAnswer: 0
    }, {
        question: "4. What is the fastest production car?",
        choices: ["Bugatti Chiron", "Koenigsegg Agera RS", "SSC Tuatara", "Hennessy Venom GT"],
        correctAnswer: 2
    }, {
        question: "5. What year did Ford introduce the Modle A?",
        choices: ["1928", "1929", "1930", "1931"],
        correctAnswer: 0

    }]

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 61

$(document).ready(function () {
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');

    timedCount();

    $(this).find(".preButton").on("click", function () {

        if (!quizOver) {
            if (currentQuestion == 0) { return false; }

            if (currentQuestion == 1) {
                $(".preButton").attr('disabled', 'disabled');
            }

            currentQuestion--;
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();

            }
        } else {
            if (viewingAns == 3) { return false; }
            currentQuestion = 0; viewingAns = 3;
            viewResults();
        }
    });

    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            var val = $("input[type='radio']:checked").val();

            if (val == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            }
            else {
                $(document).find(".quizMessage").hide();
                if (val == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                iSelectedAnswer[currentQuestion] = val;

                currentQuestion++;
                if (currentQuestion >= 1) {
                    $('.preButton').prop("disabled", false);
                }
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();

                }
                else {
                    displayScore();
                    $('#iTimeShow').html('Quiz Time Completed!');
                    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
                    c = 60;
                    $(document).find(".preButton").text("View Answer");

                    quizOver = true;
                    return false;

                }
            }

        }
        else { // quiz is over and clicked the next button (which now displays 'Play Again?'
        quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
        $(document).find(".nextButton").text("Next Question");
        $(document).find(".preButton").text("Previous Question");
        $(".preButton").attr('disabled', 'disabled');
        resetQuiz();
        viewingAns = 1;
        displayCurrentQuestion();
        hideScore();
    }
    });
});



function timedCount() {
    if (c == 60) {
        return false;
    }

    var seconds = c % 61;
    var result = (seconds < 10 ? "0" + seconds : seconds);
    $('#timer').html(result);
    if (c == 0) {
        displayScore();
        $('#iTimeShow').html('Quiz Time Completed!');
        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
        c = 60;
        $(document).find(".preButton").text("View Answer");
        quizOver = true;
        return false;

    }


    c = c - 1;
    t = setTimeout(function () {
        timedCount()
    }, 1500);


}



function displayCurrentQuestion() {

    if (c == 61) { c = 59; timedCount(); }
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    $(questionClass).text(question);
    $(choiceList).find("li").remove();
    var choice;
    console.log(currentQuestion)


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        } else {
            $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        }  
        }
    }

    function resetQuiz() {
        currentQuestion = 0;
        correctAnswers = 0;
        hideScore();
    }

    function displayScore() {
        $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
        $(document).find(".quizContainer > .result").show();
    }

    function hideScore() {
        $(document).find(".result").hide();
    }

    function viewResults() {

        if (currentQuestion == 5) { currentQuestion = 0; return false; }
        if (viewingAns == 1) { return false; }

        hideScore();

        var question = questions[currentQuestion].question;
        var questionClass = $(document).find(".quizContainer > .question");
        var choiceList = $(document).find(".quizContainer > .choiceList");
        var numChoices = questions[currentQuestion].choices.length;
        $(questionClass).text(question);
        $(choiceList).find("li").remove();
        var choice;


        for (i = 0; i < numChoices; i++) {
            choice = questions[currentQuestion].choices[i];

        }
        if (iSelectedAnswer[currentQuestion] == i) {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        } else {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        }
        currentQuestion++;
        setTimeout(function () {
            viewResults();
        }, 3000);
    }

