const flashcards = [
    {
        question: "Qual é o primeiro contato que o cliente tem com seu produto?",
        answer: "A embalagem! Ela é sua vitrine ambulante.",
        frontIcon: "🤔",
        backIcon: "💡"
    },
    {
        question: "Uma embalagem personalizada ajuda em quê?",
        answer: "Fortalecer a marca e transmitir profissionalismo.",
        frontIcon: "🎨",
        backIcon: "🏆"
    },
    {
        question: "O que acontece se a embalagem for inadequada?",
        answer: "Produto danificado + perda de confiança do cliente.",
        frontIcon: "⚠️",
        backIcon: "📉"
    },
    {
        question: "Além de proteger, o que mais a embalagem pode fazer?",
        answer: "Comunicar valores e criar experiência de unboxing.",
        frontIcon: "🛡️",
        backIcon: "✨"
    },
    {
        question: "Verdadeiro ou Falso: 'Embalagem é só custo'",
        answer: "Falso! É investimento em marketing e fidelização.",
        frontIcon: "❓",
        backIcon: "💰"
    }
];

let currentIndex = 0;
let isFlipped = false;

const flashcard = document.getElementById('flashcard');
const cardQuestion = document.getElementById('cardQuestion');
const cardAnswer = document.getElementById('cardAnswer');
const frontIcon = document.getElementById('frontIcon');
const backIcon = document.getElementById('backIcon');
const flipBtn = document.getElementById('flipBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentCardSpan = document.getElementById('currentCard');
const totalCardsSpan = document.getElementById('totalCards');
const progressDots = document.getElementById('progressDots');

function createProgressDots() {
    progressDots.innerHTML = '';
    flashcards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToCard(index));
        progressDots.appendChild(dot);
    });
}

function updateCard() {
    const card = flashcards[currentIndex];
    cardQuestion.textContent = card.question;
    cardAnswer.textContent = card.answer;
    frontIcon.textContent = card.frontIcon;
    backIcon.textContent = card.backIcon;
    currentCardSpan.textContent = currentIndex + 1;

    flashcard.classList.remove('flipped');
    isFlipped = false;
    flipBtn.textContent = '🔄 Ver Resposta';

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === flashcards.length - 1;

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
    flipBtn.textContent = isFlipped ? '🔄 Ver Pergunta' : '🔄 Ver Resposta';
}

function goToCard(index) {
    if (index >= 0 && index < flashcards.length) {
        currentIndex = index;
        updateCard();
    }
}

function nextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        updateCard();
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

flashcard.addEventListener('click', flipCard);
flipBtn.addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft': prevCard(); break;
        case 'ArrowRight': nextCard(); break;
        case ' ': case 'Enter':
            e.preventDefault();
            flipCard();
            break;
    }
});

totalCardsSpan.textContent = flashcards.length;
createProgressDots();
updateCard();
