// Textes en français et chinois pour l'interface
const texts = {
    fr: {
        title: "Exercices de Vocabulaire",
        langToggle: "Passer en Chinois",
        nextExercise: "Exercice suivant",
        placeholder: "Écris la traduction ici",
        submit: "Valider",
        showAnswer: "Afficher la réponse",
        correct: "Bravo ! 🐾",
        incorrect: "Essaie encore ! 😺",
        loading: "Chargement des mots...",
        wrongAttempts: "Mauvaise réponse. Essais restants : ",
        showCorrect: "La bonne réponse était : ",
        noAttempt: "Tu n’as pas essayé ! La réponse était : ",
        reviewMistakes: "Revoir les erreurs"
    },
    cn: {
        title: "词汇练习",
        langToggle: "切换到法语",
        nextExercise: "下一个练习",
        placeholder: "在这里写翻译",
        submit: "确认",
        showAnswer: "显示答案",
        correct: "太棒了！🐾",
        incorrect: "再试一次！😺",
        loading: "正在加载单词...",
        wrongAttempts: "错误回答。剩余尝试次数：",
        showCorrect: "正确答案是：",
        noAttempt: "你没尝试！答案是：",
        reviewMistakes: "复习错误"
    }
};

let currentLang = "fr";
let currentWord, currentExerciseType;
let vocabulary = [];
let filteredVocabulary = []; // Vocabulaire filtré par catégorie
let wrongAttempts = 0;
let hasAttempted = false;
let score = { correct: 0, total: 0 }; // Système de score
let mistakes = []; // Historique des erreurs
let seenWords = new Set(); // Mots déjà vus pour la progression

// Éléments DOM (inchangé sauf ajout de la référence à #exercise)
const exercise = document.getElementById("exercise"); // Ajout
const title = document.getElementById("title");
const langToggle = document.getElementById("langToggle");
const question = document.getElementById("question");
const options = document.getElementById("options");
const inputAnswer = document.getElementById("inputAnswer");
const submitAnswer = document.getElementById("submitAnswer");
const showAnswerButton = document.createElement("button");
const feedback = document.getElementById("feedback");
const nextExercise = document.getElementById("nextExercise");
const scoreDisplay = document.getElementById("score");
const categorySelect = document.getElementById("categorySelect");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const mistakesList = document.getElementById("mistakesList");
const reviewMistakes = document.getElementById("reviewMistakes");

// Configurer le bouton "Afficher la réponse"
showAnswerButton.id = "showAnswer";
showAnswerButton.style.display = "none";
exercise.appendChild(showAnswerButton); // Ajouté dans #exercise au lieu de body

// Charger la liste de vocabulaire depuis vocabulary.json
async function loadVocabulary() {
    feedback.textContent = texts[currentLang].loading;
    try {
        const response = await fetch("vocabulary.json");
        vocabulary = await response.json();
        filteredVocabulary = [...vocabulary]; // Copie initiale
        populateCategories(); // Remplir le menu des catégories
        feedback.textContent = "";
        updateProgress(); // Mettre à jour après chargement
        updateScore();
        generateExercise();
    } catch (error) {
        console.error("Erreur lors du chargement du vocabulaire :", error);
        feedback.textContent = "Erreur de chargement. Recharge la page.";
    }
}

// Remplir le menu des catégories
function populateCategories() {
    const categories = [...new Set(vocabulary.map(word => word.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Changer la langue
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "cn" : "fr";
    updateLanguage();
    generateExercise();
});

// Filtrer par catégorie
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    filteredVocabulary = selectedCategory === "all" 
        ? [...vocabulary] 
        : vocabulary.filter(word => word.category === selectedCategory);
    seenWords.clear(); // Réinitialiser la progression
    score.correct = 0;
    score.total = 0;
    updateScore();
    updateProgress();
    generateExercise();
});

// Générer un exercice aléatoire
function generateExercise() {
    if (filteredVocabulary.length === 0) return;
    feedback.textContent = "";
    options.innerHTML = "";
    inputAnswer.style.display = "none";
    submitAnswer.style.display = "none";
    showAnswerButton.style.display = "none";
    wrongAttempts = 0;
    hasAttempted = false;

    currentExerciseType = Math.random() < 0.67 ? "qcm" : "write";
    currentWord = filteredVocabulary[Math.floor(Math.random() * filteredVocabulary.length)];
    seenWords.add(currentWord.fr); // Ajouter à la progression
    updateProgress();

    if (currentExerciseType === "qcm") {
        const isFrToCn = Math.random() < 0.5;
        question.textContent = isFrToCn ? currentWord.fr : currentWord.cn;
        generateQCMOptions(isFrToCn);
    } else {
        question.textContent = Math.random() < 0.5 ? currentWord.fr : currentWord.cn;
        inputAnswer.style.display = "block";
        submitAnswer.style.display = "block";
        showAnswerButton.style.display = "block";
        showAnswerButton.textContent = texts[currentLang].showAnswer;
        showAnswerButton.onclick = () => showAnswer();
    }
}

// Générer les options du QCM
function generateQCMOptions(isFrToCn) {
    const correctAnswer = isFrToCn ? currentWord.cn : currentWord.fr;
    let wrongAnswers = filteredVocabulary.filter(w => w !== currentWord)
        .map(w => isFrToCn ? w.cn : w.fr)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    const allOptions = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    allOptions.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => {
            hasAttempted = true;
            checkQCMAnswer(opt, correctAnswer);
        });
        options.appendChild(btn);
    });
}

// Vérifier la réponse au QCM
function checkQCMAnswer(selected, correct) {
    score.total++;
    if (selected === correct) {
        score.correct++;
        feedback.textContent = texts[currentLang].correct;
    } else {
        feedback.textContent = texts[currentLang].incorrect;
        addToMistakes(currentWord);
    }
    updateScore();
}

// Vérifier la réponse écrite et gérer les essais
submitAnswer.addEventListener("click", () => {
    const userAnswer = inputAnswer.value.trim();
    const correctAnswer = question.textContent === currentWord.fr ? currentWord.cn : currentWord.fr;

    hasAttempted = true;
    score.total++;
    if (userAnswer === correctAnswer) {
        score.correct++;
        feedback.textContent = texts[currentLang].correct;
        wrongAttempts = 0;
    } else {
        wrongAttempts++;
        if (wrongAttempts < 3) {
            feedback.textContent = `${texts[currentLang].wrongAttempts} ${3 - wrongAttempts}`;
        } else {
            feedback.textContent = `${texts[currentLang].showCorrect} ${correctAnswer}`;
            inputAnswer.value = correctAnswer;
            inputAnswer.disabled = true;
            submitAnswer.disabled = true;
            addToMistakes(currentWord);
        }
    }
    updateScore();
});

// Afficher la réponse quand on clique sur le bouton
function showAnswer() {
    const correctAnswer = question.textContent === currentWord.fr ? currentWord.cn : currentWord.fr;
    feedback.textContent = `${texts[currentLang].showCorrect} ${correctAnswer}`;
    inputAnswer.value = correctAnswer;
    inputAnswer.disabled = true;
    submitAnswer.disabled = true;
    hasAttempted = true;
}

// Ajouter un mot à l’historique des erreurs
function addToMistakes(word) {
    if (!mistakes.some(m => m.fr === word.fr)) {
        mistakes.push(word);
        updateMistakesList();
    }
}

// Mettre à jour la liste des erreurs
function updateMistakesList() {
    mistakesList.innerHTML = "";
    mistakes.forEach(mistake => {
        const li = document.createElement("li");
        li.textContent = `${mistake.fr} - ${mistake.cn} (${mistake.category})`;
        mistakesList.appendChild(li);
    });
}

// Revoir les erreurs
reviewMistakes.addEventListener("click", () => {
    if (mistakes.length > 0) {
        filteredVocabulary = [...mistakes];
        seenWords.clear();
        score.correct = 0;
        score.total = 0;
        updateScore();
        updateProgress();
        generateExercise();
    } else {
        feedback.textContent = currentLang === "fr" ? "Aucune erreur à revoir !" : "没有错误可复习！";
    }
});

// Passer à l’exercice suivant
nextExercise.addEventListener("click", () => {
    if (!hasAttempted) {
        const correctAnswer = question.textContent === currentWord.fr ? currentWord.cn : currentWord.fr;
        feedback.textContent = `${texts[currentLang].noAttempt} ${correctAnswer}`;
        score.total++;
        addToMistakes(currentWord);
        updateScore();
    }
    inputAnswer.disabled = false;
    submitAnswer.disabled = false;
    inputAnswer.value = "";
    generateExercise();
});

// Mettre à jour le score
function updateScore() {
    scoreDisplay.textContent = `Score : ${score.correct}/${score.total}`;
}

// Mettre à jour la progression
function updateProgress() {
    const totalWords = filteredVocabulary.length;
    const seenCount = seenWords.size;
    let percentage = totalWords > 0 ? (seenCount / totalWords) * 100 : 0; // Éviter NaN
    progressBar.value = percentage; // Assigner une valeur valide
    progressText.textContent = `Progression : ${seenCount}/${totalWords}`;
}

// Mettre à jour la langue de l'interface
function updateLanguage() {
    title.textContent = texts[currentLang].title;
    langToggle.textContent = texts[currentLang].langToggle;
    nextExercise.textContent = texts[currentLang].nextExercise;
    inputAnswer.placeholder = texts[currentLang].placeholder;
    submitAnswer.textContent = texts[currentLang].submit;
    showAnswerButton.textContent = texts[currentLang].showAnswer;
    reviewMistakes.textContent = texts[currentLang].reviewMistakes;
    updateScore();
    if (filteredVocabulary.length > 0) updateProgress(); // Appeler seulement si chargé
}

// Initialisation
updateLanguage();
loadVocabulary();