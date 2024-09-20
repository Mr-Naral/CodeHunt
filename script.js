const questions = [
    { image: "1.jpg", code: "1" },
    { image: "2.jpg", code: "2" },
    { image: "3.jpg", code: "3" },
    { image: "4.jpg", code: "4" },
    { image: "5.jpg", code: "5" }
    // Add up to 20 questions with their respective numbers as the code for testing
];

let currentQuestionIndex = 0; // Tracks the current question
let lastAnsweredCode = ''; // Stores the last answered code

// Load saved progress from localStorage if available
if (localStorage.getItem('codeHuntProgress')) {
    const savedProgress = JSON.parse(localStorage.getItem('codeHuntProgress'));
    currentQuestionIndex = savedProgress.currentQuestionIndex;
    lastAnsweredCode = savedProgress.lastAnsweredCode;
}

const descriptionContainer = document.getElementById('description-container');
const questionContainer = document.getElementById('question-container');
const questionImage = document.getElementById('question-image');
const codeInput = document.getElementById('code-input');
const submitCodeButton = document.getElementById('submit-code');
const endLink = document.getElementById('end-link');
const lastCodeDisplay = document.getElementById('last-code-display');

// Hide the question container initially and display the last answered code if present
window.onload = () => {
    questionContainer.style.display = 'none';
    if (lastAnsweredCode) {
        lastCodeDisplay.textContent = `Last code found: ${lastAnsweredCode}`;
    } else {
        lastCodeDisplay.style.display = 'none';
    }
};

// Event listener for starting the game
document.getElementById('start-button').addEventListener('click', () => {
    descriptionContainer.style.display = 'none'; // Hide the description
    questionContainer.style.display = 'block'; // Show the question container
    lastCodeDisplay.style.display = 'block'; // Show the last code display
    loadQuestion();
});

// Function to load the current question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    // Update the image according to the question object
    questionImage.src = currentQuestion.image;
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1}`;
    codeInput.value = '';
}

// Event listener for submitting the answer
submitCodeButton.addEventListener('click', () => {
    const userCode = codeInput.value.trim().toLowerCase();
    const correctCode = questions[currentQuestionIndex].code.toLowerCase();

    if (userCode === correctCode) {
        lastAnsweredCode = userCode; // Update the last answered code
        localStorage.setItem('codeHuntProgress', JSON.stringify({
            currentQuestionIndex: currentQuestionIndex,
            lastAnsweredCode: lastAnsweredCode
        }));

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            lastCodeDisplay.textContent = `Last code found: ${lastAnsweredCode}`;
        } else {
            // Trigger animation after the last question is answered
            questionContainer.style.display = 'none';
            document.body.innerHTML = ''; // Clear all question content
            document.body.style.animation = 'colorChange 5s infinite'; // Trigger color-changing animation

            document.body.innerHTML = `
                <h1 style="text-align: center; color: #4caf50;">Congratulations! You've completed CodeHunt!</h1>
                <p style="text-align: center; font-size: 1.2rem; color: #666;">Last code found: ${lastAnsweredCode}</p>
                <a href="#" id="end-link" style="display: block; text-align: center; font-size: 1.5rem; color: #1976d2;">Finish</a>
            `;

            // Clear localStorage once completed
            localStorage.removeItem('codeHuntProgress');
        }
    } else {
        alert('Incorrect code. Please try again.');
        codeInput.value = '';
    }
});

// CSS for color-changing animation
const style = document.createElement('style');
style.textContent = `
    @keyframes colorChange {
        0% { background-color: #ffeb3b; }
        25% { background-color: #f44336; }
        50% { background-color: #2196f3; }
        75% { background-color: #4caf50; }
        100% { background-color: #ffeb3b; }
    }
`;
document.head.appendChild(style);
