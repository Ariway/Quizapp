const questions = [
    {
        question: "Which is National Animal of India?",
        answers: [
            {text: "Tiger" , correct: true},
            {text: "Lion" , correct: false},
            {text: "Fox" , correct: false},
            {text: "Jackal" , correct: false},
        ]
    },
    {
        question: "Which is National Bird of India?",
        answers: [
            {text: "Kingfisher" , correct: false},
            {text: "Parrot" , correct: false},
            {text: "Sparrow" , correct: false},
            {text: "Peacock" , correct: true},
        ]
    },
    {
        question: "Which number is greater than 5?",
        answers: [
            {text: "1" , correct: false},
            {text: "2" , correct: false},
            {text: "6" , correct: true},
            {text: "4" , correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next");

let currentQuestion = 0;
let score = 0;

function startQuiz(){
    currentQuestion=0;
    score=0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion(){
    resetButtons();

    let currentQuestionindex = questions[currentQuestion];
    let questionNumber =  currentQuestion+1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestionindex.question;

    currentQuestionindex.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
    
        button.addEventListener("click", selectAnswer);
    });

}

function resetButtons(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";
    if(isCorrect){
        selected.classList.add("correct");
        score++;
    }
    else{
        selected.classList.add("incorrect");
    }
 Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetButtons();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestion++;
    if(currentQuestion<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestion < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();