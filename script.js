// Liste de mots français-chinois (base initiale, à enrichir)
const vocabulary = [
    // Vie quotidienne
    { fr: "matin", cn: "早上" }, { fr: "midi", cn: "中午" }, { fr: "soir", cn: "晚上" },
    { fr: "nuit", cn: "夜" }, { fr: "jour", cn: "天" }, { fr: "semaine", cn: "星期" },
    { fr: "mois", cn: "月" }, { fr: "année", cn: "年" }, { fr: "hier", cn: "昨天" },
    { fr: "aujourd'hui", cn: "今天" }, { fr: "demain", cn: "明天" }, { fr: "maintenant", cn: "现在" },
    { fr: "tôt", cn: "早" }, { fr: "tard", cn: "晚" }, { fr: "temps", cn: "时间" },

    // Salutations et politesse
    { fr: "bonjour", cn: "你好" }, { fr: "salut", cn: "嗨" }, { fr: "au revoir", cn: "再见" },
    { fr: "merci", cn: "谢谢" }, { fr: "s'il te plaît", cn: "请" }, { fr: "pardon", cn: "对不起" },
    { fr: "excuse-moi", cn: "不好意思" }, { fr: "bienvenue", cn: "欢迎" }, { fr: "comment vas-tu ?", cn: "你好吗？" },

    // Famille
    { fr: "père", cn: "父亲" }, { fr: "mère", cn: "母亲" }, { fr: "frère", cn: "哥哥" },
    { fr: "sœur", cn: "姐姐" }, { fr: "fils", cn: "儿子" }, { fr: "fille", cn: "女儿" },
    { fr: "grand-père", cn: "爷爷" }, { fr: "grand-mère", cn: "奶奶" }, { fr: "oncle", cn: "叔叔" },
    { fr: "tante", cn: "姑姑" }, { fr: "cousin", cn: "表哥" }, { fr: "famille", cn: "家庭" },

    // Maison
    { fr: "maison", cn: "房子" }, { fr: "appartement", cn: "公寓" }, { fr: "chambre", cn: "房间" },
    { fr: "salon", cn: "客厅" }, { fr: "cuisine", cn: "厨房" }, { fr: "salle de bain", cn: "浴室" },
    { fr: "jardin", cn: "花园" }, { fr: "porte", cn: "门" }, { fr: "fenêtre", cn: "窗户" },
    { fr: "table", cn: "桌子" }, { fr: "chaise", cn: "椅子" }, { fr: "lit", cn: "床" },

    // Nourriture et boissons
    { fr: "eau", cn: "水" }, { fr: "pain", cn: "面包" }, { fr: "fromage", cn: "奶酪" },
    { fr: "viande", cn: "肉" }, { fr: "poisson", cn: "鱼" }, { fr: "riz", cn: "米饭" },
    { fr: "pâtes", cn: "面条" }, { fr: "légume", cn: "蔬菜" }, { fr: "fruit", cn: "水果" },
    { fr: "pomme", cn: "苹果" }, { fr: "banane", cn: "香蕉" }, { fr: "orange", cn: "橙子" },
    { fr: "jus", cn: "果汁" }, { fr: "thé", cn: "茶" }, { fr: "café", cn: "咖啡" },
    { fr: "sucre", cn: "糖" }, { fr: "sel", cn: "盐" }, { fr: "huile", cn: "油" },

    // Vêtements
    { fr: "chemise", cn: "衬衫" }, { fr: "pantalon", cn: "裤子" }, { fr: "robe", cn: "裙子" },
    { fr: "chaussure", cn: "鞋子" }, { fr: "chaussette", cn: "袜子" }, { fr: "manteau", cn: "外套" },
    { fr: "écharpe", cn: "围巾" }, { fr: "chapeau", cn: "帽子" }, { fr: "sac", cn: "包" },

    // Transports
    { fr: "voiture", cn: "汽车" }, { fr: "vélo", cn: "自行车" }, { fr: "train", cn: "火车" },
    { fr: "avion", cn: "飞机" }, { fr: "bateau", cn: "船" }, { fr: "bus", cn: "公交车" },
    { fr: "métro", cn: "地铁" }, { fr: "route", cn: "路" }, { fr: "gare", cn: "火车站" },
    { fr: "aéroport", cn: "机场" }, { fr: "billet", cn: "票" },

    // Nature et météo
    { fr: "soleil", cn: "太阳" }, { fr: "lune", cn: "月亮" }, { fr: "étoile", cn: "星星" },
    { fr: "ciel", cn: "天空" }, { fr: "nuage", cn: "云" }, { fr: "pluie", cn: "雨" },
    { fr: "neige", cn: "雪" }, { fr: "vent", cn: "风" }, { fr: "froid", cn: "冷" },
    { fr: "chaud", cn: "热" }, { fr: "arbre", cn: "树" }, { fr: "fleur", cn: "花" },
    { fr: "montagne", cn: "山" }, { fr: "rivière", cn: "河" }, { fr: "mer", cn: "海" },

    // Animaux
    { fr: "chat", cn: "猫" }, { fr: "chien", cn: "狗" }, { fr: "oiseau", cn: "鸟" },
    { fr: "poisson", cn: "鱼" }, { fr: "cheval", cn: "马" }, { fr: "vache", cn: "牛" },
    { fr: "cochon", cn: "猪" }, { fr: "lapin", cn: "兔子" }, { fr: "souris", cn: "老鼠" },

    // École et travail
    { fr: "école", cn: "学校" }, { fr: "professeur", cn: "老师" }, { fr: "élève", cn: "学生" },
    { fr: "livre", cn: "书" }, { fr: "cahier", cn: "笔记本" }, { fr: "stylo", cn: "笔" },
    { fr: "crayon", cn: "铅笔" }, { fr: "bureau", cn: "办公桌" }, { fr: "ordinateur", cn: "电脑" },
    { fr: "travail", cn: "工作" }, { fr: "métier", cn: "职业" }, { fr: "magasin", cn: "商店" },

    // Corps humain
    { fr: "tête", cn: "头" }, { fr: "visage", cn: "脸" }, { fr: "œil", cn: "眼睛" },
    { fr: "nez", cn: "鼻子" }, { fr: "bouche", cn: "嘴" }, { fr: "oreille", cn: "耳朵" },
    { fr: "main", cn: "手" }, { fr: "pied", cn: "脚" }, { fr: "bras", cn: "胳膊" },
    { fr: "jambe", cn: "腿" }, { fr: "cœur", cn: "心" },

    // Sentiments et adjectifs
    { fr: "amour", cn: "爱" }, { fr: "joie", cn: "快乐" }, { fr: "tristesse", cn: "悲伤" },
    { fr: "peur", cn: "害怕" }, { fr: "colère", cn: "生气" }, { fr: "fatigue", cn: "疲倦" },
    { fr: "beau", cn: "漂亮" }, { fr: "grand", cn: "大" }, { fr: "petit", cn: "小" },
    { fr: "long", cn: "长" }, { fr: "court", cn: "短" }, { fr: "bon", cn: "好" },
    { fr: "mauvais", cn: "坏" }, { fr: "facile", cn: "容易" }, { fr: "difficile", cn: "难" },

    // Verbes courants
    { fr: "manger", cn: "吃" }, { fr: "boire", cn: "喝" }, { fr: "dormir", cn: "睡" },
    { fr: "parler", cn: "说" }, { fr: "écouter", cn: "听" }, { fr: "regarder", cn: "看" },
    { fr: "lire", cn: "读" }, { fr: "écrire", cn: "写" }, { fr: "aller", cn: "去" },
    { fr: "venir", cn: "来" }, { fr: "prendre", cn: "拿" }, { fr: "donner", cn: "给" },
    { fr: "acheter", cn: "买" }, { fr: "vendre", cn: "卖" }, { fr: "travailler", cn: "工作" },

    // Loisirs et culture
    { fr: "musique", cn: "音乐" }, { fr: "danse", cn: "舞蹈" }, { fr: "film", cn: "电影" },
    { fr: "photo", cn: "照片" }, { fr: "sport", cn: "运动" }, { fr: "jeu", cn: "游戏" },
    { fr: "fête", cn: "节日" }, { fr: "voyage", cn: "旅行" }, { fr: "restaurant", cn: "餐厅" },
    { fr: "cinéma", cn: "电影院" }, { fr: "parc", cn: "公园" }, { fr: "plage", cn: "海滩" },

    // Couleurs
    { fr: "rouge", cn: "红色" }, { fr: "bleu", cn: "蓝色" }, { fr: "vert", cn: "绿色" },
    { fr: "jaune", cn: "黄色" }, { fr: "noir", cn: "黑色" }, { fr: "blanc", cn: "白色" },
    { fr: "rose", cn: "粉色" }, { fr: "gris", cn: "灰色" },

    // Nombres (quelques exemples)
    { fr: "un", cn: "一" }, { fr: "deux", cn: "二" }, { fr: "trois", cn: "三" },
    { fr: "quatre", cn: "四" }, { fr: "cinq", cn: "五" }, { fr: "dix", cn: "十" },
    { fr: "vingt", cn: "二十" }, { fr: "cent", cn: "百" },

    // Questions et mots utiles
    { fr: "quoi", cn: "什么" }, { fr: "qui", cn: "谁" }, { fr: "où", cn: "哪里" },
    { fr: "quand", cn: "什么时候" }, { fr: "pourquoi", cn: "为什么" }, { fr: "comment", cn: "怎么" },
    { fr: "oui", cn: "是" }, { fr: "non", cn: "不" }, { fr: "peut-être", cn: "也许" },
    { fr: "beaucoup", cn: "很多" }, { fr: "peu", cn: "少" }, { fr: "tout", cn: "所有" },
    { fr: "rien", cn: "没有" }, { fr: "ici", cn: "这里" }, { fr: "là", cn: "那里" },

    // Autres mots utiles
    { fr: "ville", cn: "城市" }, { fr: "village", cn: "村庄" }, { fr: "argent", cn: "钱" },
    { fr: "prix", cn: "价格" }, { fr: "magasin", cn: "商店" }, { fr: "marché", cn: "市场" },
    { fr: "hôpital", cn: "医院" }, { fr: "médecin", cn: "医生" }, { fr: "malade", cn: "生病" },
    { fr: "santé", cn: "健康" }, { fr: "vacances", cn: "假期" }, { fr: "week-end", cn: "周末" }
];

// Textes en français et chinois pour l'interface
const texts = {
    fr: {
        title: "Exercices de Vocabulaire",
        langToggle: "Passer en Chinois",
        nextExercise: "Exercice suivant",
        placeholder: "Écris la traduction ici",
        submit: "Valider",
        correct: "Bravo ! 🐾",
        incorrect: "Essaie encore ! 😺"
    },
    cn: {
        title: "词汇练习",
        langToggle: "切换到法语",
        nextExercise: "下一个练习",
        placeholder: "在这里写翻译",
        submit: "确认",
        correct: "太棒了！🐾",
        incorrect: "再试一次！😺"
    }
};

let currentLang = "fr";
let currentWord, currentExerciseType;

// Éléments DOM
const title = document.getElementById("title");
const langToggle = document.getElementById("langToggle");
const question = document.getElementById("question");
const options = document.getElementById("options");
const inputAnswer = document.getElementById("inputAnswer");
const submitAnswer = document.getElementById("submitAnswer");
const feedback = document.getElementById("feedback");
const nextExercise = document.getElementById("nextExercise");

// Changer la langue
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "cn" : "fr";
    updateLanguage();
    generateExercise();
});

// Générer un exercice aléatoire
function generateExercise() {
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
generateExercise();