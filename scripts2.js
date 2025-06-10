const categories = [
    { name: "Redes", questions: [
        { text: "¿Cual es el codigo de colores para la norma T568B?", image: "question1.jpg", answers: ["BN/N/BV/A/BA/V/BC/C", "BN/V/BV/A/BA/N/BC/C", "BC/C/BN/A/BA/N/VB/V", "N/BN/V/BA/A/BV/C/BC"], correct: 0, points: 3 }
    ]},
    { name: "programación", questions: [
        { text: "Indique el lenguaje de programación del siguiente codigo: function contar(){\n let x=0; \n let fin=10; \n for(let x=0;x<=fin;x++){ \n alert(x);\n } \n }", image: "question2.png", answers: ["c++", "java script", "java", "c#"], correct: 1, points: 3 }
    ]},
    { name: "html", questions: [
        { text: "Indique las lineas donde se encuentran los errores del siguiente codigo:", image: "question3.png", answers: ["11-18","18-17","12-11","13-16"], correct: 0, points: 3 }
    ]},
    { name: "jscript", questions: [
        { text: "Encuentre el error en el siguiente script", image: "question4.png", answers: ["fin=10","const index =0","for","console.log"], correct: 1, points: 3 }
    ]},
    { name: "SQL", questions: [
        { text: "De la tabla alumnos con los atributos, id(int primary key), nombre(varchar(50)), email(text) y edad(int) ¿Qué código sql agrega una columna con el nombre “imagen” (varchar not null)", image: "question5.png", answers: ["Insert into alumnos(imagen varchar(50) not null)","alter table alumnos set imagen= imagen.jpg","Modifi from alumnos where imagen =1","alter table alumnos add imagen varchar(255) not null"], correct: 1, points: 3 }
    ]}
];

categories.forEach(category => {
    category.originalQuestions = category.questions.map(q => ({ ...q })); // Guardar copia inicial
});


let scores = [0, 0];
let currentPlayer = 0;

function displayCategories() {
    const categoryDiv = document.getElementById("categories");
    categoryDiv.innerHTML = "";

    categories.forEach((category, catIndex) => {
        if (category.questions.length === 0) return; // Ocultar categorías vacías

        const div = document.createElement("div");
        div.classList.add("category");
        div.dataset.index = catIndex;
        div.innerHTML = `<h3>${category.name}</h3>`;
        
        category.questions.forEach((q, qIndex) => {
            const button = document.createElement("button");
            button.textContent = `${q.points} pts`;
            button.dataset.catIndex = catIndex;
            button.dataset.qIndex = qIndex;
            button.onclick = () => showQuestion(catIndex, qIndex);
            div.appendChild(button);
        });

        categoryDiv.appendChild(div);
    });
}

function showQuestion(catIndex, qIndex) {
    const questionBox = document.getElementById("questionBox");
    questionBox.classList.remove("d-none"); // Mostrar el contenedor con Bootstrap

    const questionData = categories[catIndex].questions[qIndex];
    document.getElementById("question").textContent = questionData.text;

    const imgElement = document.getElementById("questionImage");
    if (questionData.image) {
        imgElement.src = questionData.image;
        imgElement.classList.remove("d-none"); // Mostrar la imagen si hay una
    } else {
        imgElement.classList.add("d-none"); // Ocultar si no hay imagen
    }

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    questionData.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("btn", "btn-secondary", "w-100");
        btn.onclick = () => checkAnswer(index, questionData, catIndex, qIndex);
        answersDiv.appendChild(btn);
    });
}


function showFeedback(isCorrect) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = isCorrect ? "¡Correcto!" : "¡Incorrecto!";
    feedback.className = isCorrect ? "correct" : "incorrect";
    feedback.style.display = "block";
    setTimeout(() => feedback.style.display = "none", 1500); // Ocultar después de 1.5s
}

/* function checkAnswer(selected, questionData, catIndex, qIndex) {
    const isCorrect = selected === questionData.correct;

    // Reproducir sonido y mostrar animación
    document.getElementById(isCorrect ? "correctSound" : "incorrectSound").play();
    showFeedback(isCorrect);

    if (isCorrect) {
        scores[currentPlayer] += questionData.points;
        updateScore();

        if (scores[currentPlayer] >= 9) {
            showWinAnimation();
            return;
        }
    }

    categories[catIndex].questions.splice(qIndex, 1);
    displayCategories();

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.getElementById("currentPlayer").textContent = `Jugador ${currentPlayer + 1}`;
    closeQuestion();
}
 */

let score = 0;

function checkAnswer(selected, questionData, catIndex, qIndex) {
    const isCorrect = selected === questionData.correct;

    document.getElementById(isCorrect ? "correctSound" : "incorrectSound").play();
    showFeedback(isCorrect);

    if (isCorrect) {
        score += questionData.points;
        updateScore();

        if (score >= 9) {
            showWinAnimation();
            return;
        }
    }

    categories[catIndex].questions.splice(qIndex, 1);
    displayCategories();
    closeQuestion();
}

function updateScore() {
    document.getElementById("points1").textContent = score;
}

function showWinAnimation() {
    alert("¡Has ganado con 9 puntos! 🎉");
    setTimeout(resetGame, 1000); // Reiniciar juego tras 2 segundos
}

function resetGame() {
    score = 0;
    document.getElementById("points1").textContent = score;

    // Restaurar preguntas desde la copia original
    categories.forEach(category => {
        category.questions = category.originalQuestions.map(q => ({ ...q }));
    });

    displayCategories();

    // Efecto Bootstrap en el botón de reinicio
    const resetBtn = document.querySelector(".btn-warning");
    resetBtn.classList.add("btn-danger");
    resetBtn.textContent = "Reiniciando...";
    
    setTimeout(() => {
        resetBtn.classList.remove("btn-danger");
        closeQuestion();
        resetBtn.textContent = "Reiniciar Juego";
    }, 500);
}



/* function showWinAnimation() {
    alert(`¡Jugador ${currentPlayer + 1} ha ganado con 1000 puntos! 🎉`);
    disableGame();
}
 */

/* function updateScore() {
    document.getElementById("points1").textContent = scores[0];
    document.getElementById("points2").textContent = scores[1];
}
 */
/* function showWinAnimation() {
    alert(`¡Jugador ${currentPlayer + 1} ha ganado con 9 puntos!`);
    disableGame();
}
 */
function closeQuestion() {
    document.getElementById("questionBox").classList.add("d-none"); // Bootstrap usa "d-none"
}


function disableGame() {
    document.getElementById("categories").innerHTML = "<h2>Juego terminado</h2>";
}

function displayCategories() {
    const categoryDiv = document.getElementById("categories");
    categoryDiv.innerHTML = "";

    categories.forEach((category, catIndex) => {
        if (category.questions.length === 0) return;

        const div = document.createElement("div");
        div.classList.add("col-md-4", "text-center", "mb-3");

        div.innerHTML = `<h3>${category.name}</h3>`;
        
        category.questions.forEach((q, qIndex) => {
            const button = document.createElement("button");
            button.classList.add("btn", "btn-secondary", "w-100");
            button.textContent = `${q.points} pts`;
            button.dataset.catIndex = catIndex;
            button.dataset.qIndex = qIndex;
            button.onclick = () => showQuestion(catIndex, qIndex);
            div.appendChild(button);
        });

        categoryDiv.appendChild(div);
    });
}


window.onload = displayCategories;
