// Array of questions
const questions = [
    {
        jsquestion: "CSS is used for?",
        options: ["Styling", "Backend coding", "Database management"],
        correct_index: 0
    },
    {
        jsquestion: "How do you select an element with the ID 'header' in CSS?",
        options: [".header", "#header", "element#header"],
        correct_index: 1
    },
    {
        jsquestion: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color"],
        correct_index: 2
    },
    {
        jsquestion: "How do you make a list not display bullet points?",
        options: ["list-style: none", "list-type: no-bullet", "bullets: none"],
        correct_index: 0
    },
    {
        jsquestion: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size"],
        correct_index: 2
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null; // Track selected answer
let answerSelected = false; // Track if an answer is selected

// declare function for Show current question on page.
function showCurrentQuestion(){ 
    const currentQ = questions[currentQuestion];
    // get then ID "question" and chang the text to the current question text.
    document.getElementById("question").textContent = currentQ.jsquestion;
    // add all option in one variable.
    const alloption = document.getElementsByClassName("option");
    alloption[0].textContent = currentQ.options[0];
    alloption[1].textContent = currentQ.options[1];
    alloption[2].textContent = currentQ.options[2];
    
    // Reset selection state
    selectedAnswer = null;
    answerSelected = false;
    
    // Remove any previous selection styling
    for (let i = 0; i < 3; i++) {
        alloption[i].style.backgroundColor = "";
        alloption[i].style.borderColor = "rgb(226, 232, 240)";
    }
    
    // Update next button state
    updateNextButton();

    // update progress display
    updateProgress();
}

// declare function for Update progress.
function updateProgress(){
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById('question-counter').textContent = 
        `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('score-display').textContent = `Score: ${score}`;
}

// Update next button state
function updateNextButton() {
    const nextButton = document.getElementById('next');
    if (answerSelected) {
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "rgb(102, 126, 234)";
        nextButton.style.color = "white";
        nextButton.style.cursor = "pointer";
    } else {
        nextButton.disabled = true;
        nextButton.style.backgroundColor = "rgb(226, 232, 240)";
        nextButton.style.color = "rgb(160, 174, 192)";
        nextButton.style.cursor = "not-allowed";
    }
}

// after page lode show the js question on html.
document.addEventListener('DOMContentLoaded', function(){
    showCurrentQuestion();
    
    // Add event listener to next button
    document.getElementById('next').addEventListener('click', nextQuestion);
});

// Function to handle answer selection
function selectAnswer(selectedIndex){
    // Remove selection from all options
    const alloption = document.getElementsByClassName("option");
    for (let i = 0; i < 3; i++) {
        alloption[i].style.backgroundColor = "";
        alloption[i].style.borderColor = "rgb(226, 232, 240)";
    }
    
    // Highlight selected option
    alloption[selectedIndex].style.backgroundColor = "rgb(237, 242, 247)";
    alloption[selectedIndex].style.borderColor = "rgb(102, 126, 234)";
    
    // Store selected answer
    selectedAnswer = selectedIndex;
    answerSelected = true;
    
    // Enable next button
    updateNextButton();
}

// Function to move to next question
function nextQuestion() {
    if (!answerSelected) return;
    
    // Check if answer is correct
    const correctIndex = questions[currentQuestion].correct_index;
    if (selectedAnswer === correctIndex) {
        score++;
        // Show correct feedback
        const alloption = document.getElementsByClassName("option");
        alloption[selectedAnswer].style.backgroundColor = "#d4edda";
        alloption[selectedAnswer].style.borderColor = "#28a745";
    } else {
        // Show wrong feedback
        const alloption = document.getElementsByClassName("option");
        alloption[selectedAnswer].style.backgroundColor = "#f8d7da";
        alloption[selectedAnswer].style.borderColor = "#dc3545";
        
        // Also show correct answer
        alloption[correctIndex].style.backgroundColor = "#d4edda";
        alloption[correctIndex].style.borderColor = "#28a745";
    }
    
    // Update score display immediately
    document.getElementById('score-display').textContent = `Score: ${score}`;
    
    // Wait a moment before moving to next question
    setTimeout(() => {
        // Move to the next question
        currentQuestion++;
        
        // If we have more questions then move on, if not then show the result
        if (currentQuestion < questions.length) {
            showCurrentQuestion();
        } else {
            showResult();
        }
    }, 1000); // 1 second delay to see the feedback
}

// declare function to show result.
function showResult(){
    // remove everything in 'quiz-box'.
    document.getElementById("quiz-box").innerHTML = "";

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    let message = document.createElement("p");
    // if 4-5 Q correct
    if(score >= 4){ 
        message.textContent = "🎉 Excellent, You're a quiz master.";
        message.style.color = "green";
    } 
    // if 2-3 Q correct
    else if (score >= 2){ 
        message.textContent = "👍 Good job, Keep it up.";
        message.style.color = "orange";
    }
    // if 0-1 Q correct
    else { 
        message.textContent = "💪 Keep learning, You'll get better.";
        message.style.color = "red";
    }

    const heading = document.createElement("h2");
    heading.textContent = "Quiz Completed!";
    heading.style.marginTop = "12px";

    const scorePara = document.createElement("p");
    scorePara.textContent = `Your score: ${score} out of ${questions.length}`;
    scorePara.style.marginTop = "12px";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.className = "option";
    restartButton.style.marginTop = "15px";
    restartButton.onclick = function() {
        location.reload();
    };

    const categoriesButton = document.createElement("a");
    categoriesButton.textContent = "Back to Categories";
    categoriesButton.className = "option";
    categoriesButton.style.marginLeft = "10px";
    categoriesButton.style.textDecoration = "none";
    categoriesButton.style.display = "inline-block";
    categoriesButton.href="Quiz_Category.html";

    resultDiv.appendChild(heading);
    resultDiv.appendChild(scorePara);
    resultDiv.appendChild(message);
    resultDiv.appendChild(restartButton);
    resultDiv.appendChild(categoriesButton);
    

    // Update progress to 100% at the end
    document.getElementById("progress").style.width = "100%";
}
 