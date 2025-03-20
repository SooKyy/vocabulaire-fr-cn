// Textes en français et chinois pour l'interface
const texts = {
    fr: {
        title: "Exercices de Vocabulaire",
        langToggle: "Passer en Chinois",
        nextExercise: "Exercice suivant",
        placeholder: "Écris la traduction ici",
        submit: "Valider",
        correct: "Bravo ! 🐾",
        incorrect: "Essaie encore ! 😺",
        loading: "Chargement des mots..."
    },
    cn: {
        title: "词汇练习",
        langToggle: "切换到法语",
        nextExercise: "下一个练习",
        placeholder: "在这里写翻译",
        submit: "确认",
        correct: "太棒了！🐾",
        incorrect: "再试一次！😺",
        loading: "正在加载单词..."
    }
};

let currentLang = "fr";
let currentWord, currentExerciseType;
let vocabulary = [];

// Éléments DOM
const title = document.getElementById("title");
const langToggle = document.getElementById("langToggle");
const question = document.getElementById("question");
const options = document.getElementById("options");
const inputAnswer = document.getElementById("inputAnswer");
const submitAnswer = document.getElementById("submitAnswer");
const feedback = document.getElementById("feedback");
const nextExercise = document.getElementById("nextExercise");

// Charger la liste de vocabulaire depuis vocabulary.json
async function loadVocabulary() {
    feedback.textContent = texts[currentLang].loading;
    try {
        const response = await fetch("vocabulary.json");
        vocabulary = await response.json();
        feedback.textContent = "";
        generateExercise();
    } catch (error) {
        console.error("Erreur lors du chargement du vocabulaire :", error);
        feedback.textContent = "Erreur de chargement. Recharge la page.";
    }
}

// Changer la langue
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "cn" : "fr";
    updateLanguage();
    generateExercise();
});

// Générer un exercice aléatoire
function generateExercise() {
    if (vocabulary.length === 0) return;
    feedback.textContent = "";
    options.innerHTML = "";
    inputAnswer.style.display = "none";
    submitAnswer.style.display = "none";

    currentExerciseType = Math.random() < 0.67 ? "qcm" : "write";
    currentWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];

    if (currentExerciseType === "qcm") {
        const isFrToCn = Math.random() < 0.5;
        question.textContent = isFrToCn ? currentWord.fr : currentWord.cn;
        generateQCMOptions(isFrToCn);
    } else {
        question.textContent = Math.random() < 0.5 ? currentWord.fr : currentWord.cn;
        inputAnswer.style.display = "block";
        submitAnswer.style.display = "block";
        inputAnswer.value = "";
    }
}

// Générer les options du QCM
function generateQCMOptions(isFrToCn) {
    const correctAnswer = isFrToCn ? currentWord.cn : currentWord.fr;
    let wrongAnswers = vocabulary.filter(w => w !== currentWord)
        .map(w => isFrToCn ? w.cn : w.fr)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    const allOptions = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    allOptions.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => checkQCMAnswer(opt, correctAnswer));
        options.appendChild(btn);
    });
}

// Vérifier la réponse au QCM
function checkQCMAnswer(selected, correct) {
    feedback.textContent = selected === correct ? texts[currentLang].correct : texts[currentLang].incorrect;
}

// Vérifier la réponse écrite
submitAnswer.addEventListener("click", () => {
    const userAnswer = inputAnswer.value.trim();
    const correctAnswer = question.textContent === currentWord.fr ? currentWord.cn : currentWord.fr;
    feedback.textContent = userAnswer === correctAnswer ? texts[currentLang].correct : texts[currentLang].incorrect;
});

// Passer à l'exercice suivant
nextExercise.addEventListener("click", generateExercise);

// Mettre à jour la langue de l'interface
function updateLanguage() {
    title.textContent = texts[currentLang].title;
    langToggle.textContent = texts[currentLang].langToggle;
    nextExercise.textContent = texts[currentLang].nextExercise;
    inputAnswer.placeholder = texts[currentLang].placeholder;
    submitAnswer.textContent = texts[currentLang].submit;
}

// Initialisation
updateLanguage();
loadVocabulary();