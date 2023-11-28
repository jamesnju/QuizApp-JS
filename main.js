const quesions  = [
    {
        quesion  : "The largest contry in Africa ?",
        answers : [
            {text: "Kenya", correct: true},
            {text: "Uganda", correct: false},
            {text: "Tanzania", correct: false},
            {text: "Egypt", correct: false},
        ]
    },
    {
        quesion  : "Capital city of Kenya ?",
        answers : [
            {text: "Kenya", correct: false},
            {text: "Nairobi", correct: true},
            {text: "Tanzania", correct: false},
            {text: "Egypt", correct: false},
        ]
    },
    {
        quesion  : "which is not among the East Afica Contries ?",
        answers : [
            {text: "Kenya", correct: false},
            {text: "Uganda", correct: false},
            {text: "Tanzania", correct: false},
            {text: "Egypt", correct: true},
        ]
    }
];

let elementQestion = document.getElementById('question');
let elementAnswerbtn = document.getElementById('answerbtn');
let elementNext = document.getElementById('nextbtn');



let currentQestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQestionIndex = 0;
    score =0;
    elementNext.innerHTML = "Next";
    showQuiz();
    
}

function showQuiz(){

    resetState();//will resetthe state of the question to begin from 1
    let currentQestion = quesions[currentQestionIndex];
    let questionNumber  = currentQestionIndex + 1;
    elementQestion.innerHTML = questionNumber + "." + currentQestion.quesion

    // displaying questions

    currentQestion.answers.forEach(answer=>{
        const  button  = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);

        // check if answer is correct
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
    })
}


function resetState(){
    elementNext.style.display = "none";
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerbtn.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    elementNext.style.display= "block";

}
// next button

elementNext.addEventListener("click", ()=>{
    if(currentQestionIndex < quesions.length){
        handleNext();
    }else{
        startQuiz();
    }
})


function handleNext(){
    currentQestionIndex++;
    if(currentQestionIndex < quesions.length){
        showQuiz();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    elementQestion.innerHTML = `Your Score is ${score} out of ${quesions.length}`;
    elementNext.innerHTML = "Reattempt";
    elementNext.style.display = "block";
}

startQuiz();