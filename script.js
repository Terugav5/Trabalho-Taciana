// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Quiz data sobre a Balaiada
const quizData = [
    {
        question: "Em qual província brasileira ocorreu a revolta da Balaiada?",
        options: ["Maranhão", "Pernambuco", "Pará", "Bahia"],
        correctAnswer: 0,
        explanation: "A revolta ocorreu na província do Maranhão."
    },
    {
        question: "Qual dos seguintes grupos sociais NÃO participou diretamente da Balaiada?",
        options: ["Escravos fugidos", "Pobres e desempregados", "Artesãos e pequenos comerciantes", "Grandes proprietários de terras"],
        correctAnswer: 3,
        explanation: "Grandes proprietários de terras não participaram diretamente da revolta."
    },
    {
        question: "Quem foi o principal líder popular que deu nome à revolta?",
        options: ["Manuel Congo", "Manuel Francisco dos Anjos Ferreira", "Cipriano Barata", "Antônio Cosme"],
        correctAnswer: 1,
        explanation: "Manuel Francisco dos Anjos Ferreira deu nome à revolta."
    },
    {
        question: "Qual foi a principal consequência da Balaiada para o Brasil?",
        options: ["Redução do controle do governo central sobre as províncias", "Fortalecimento do poder dos monarquistas", "Abolição da escravatura na província do Maranhão", "O fim do período regencial"],
        correctAnswer: 1,
        explanation: "A balaiada levou ao fortalecimento do poder dos monarquistas."
    },
    {
        question: "A Balaiada foi um movimento liderado exclusivamente pela elite agrária descontente.",
        options: ["Sim", "Não"],
        correctAnswer: 1,
        explanation: "Não, a revolta foi um movimento popular que envolveu diversas classes sociais."
    },
    {
        question: "Uma das causas da revolta foi a disputa pelo poder local entre duas facções políticas: os 'caboclos' e os 'bem-te-vis'.",
        options: ["Sim", "Não"],
        correctAnswer: 0,
        explanation: "Sim, a disputa entre essas facções foi uma das causas da revolta."
    }
];

// Variáveis do quiz
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Elementos DOM
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionCounter = document.getElementById('question-counter');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const progress = document.getElementById('progress');
const scoreDisplay = document.getElementById('score-display');
const feedback = document.getElementById('feedback');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    // Embaralhar as perguntas antes de começar
    shuffleArray(quizData);
    
    showScreen('question');
    loadQuestion();
}

function showScreen(screenType) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    switch(screenType) {
        case 'start':
            startScreen.classList.add('active');
            break;
        case 'question':
            questionScreen.classList.add('active');
            break;
        case 'result':
            resultScreen.classList.add('active');
            break;
    }
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    
    // Atualizar contador e barra de progresso
    questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    progress.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    // Carregar pergunta
    questionText.textContent = question.question;
    
    // Limpar opções anteriores
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    nextBtn.style.display = 'none';
    
    // Criar opções
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(answerIndex, optionElement) {
    // Remover seleção anterior
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Selecionar nova opção
    optionElement.classList.add('selected');
    selectedAnswer = answerIndex;
    
    // Mostrar resultado da pergunta
    showAnswerResult();
}

function showAnswerResult() {
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    // Verificar resposta
    if (selectedAnswer === question.correctAnswer) {
        score++;
    }
    
    // Mostrar botão próxima pergunta
    nextBtn.style.display = 'block';
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Ver Resultado' : 'Próxima Pergunta';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen('result');
    
    const percentage = Math.round((score / quizData.length) * 100);
    scoreDisplay.textContent = `${score} de ${quizData.length} perguntas corretas (${percentage}%)`;
    
    // Feedback baseado na pontuação
    let feedbackText = '';
    if (percentage >= 80) {
        feedbackText = " Joga muito, Sei que você usou chat Gpt para isso.";
    } else if (percentage >= 60) {
        feedbackText = " vai ter que fica de Reforso desse jeito ";
    } else if (percentage >= 40) {
        feedbackText = " Ta pior que o Big.";
    } else {
        feedbackText = " Colocar o Brio para voce assistir.";
    }
    
    feedback.textContent = feedbackText;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    showScreen('start');
}