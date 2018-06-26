// Dclaracion de las variables
const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents = document.getElementById("tablaUsers");
const cohortsSelect = document.getElementById("trainingCenters");
const resp1 = document.getElementById("respuestas1");

// // Eventos del dom
btnLima.addEventListener("click", () => {
    // console.log(e.target.textContent);
    // document.getElementById('contenidoData').style.display="block";
    fetch('../data/cohorts.json').then(function (response) {
        return response.json();
    })
        .then(function (dataCohorts) {
            dataCohorts.forEach((elemento) => {
                if (elemento["id"].substring(0, 3) === "lim") {
                    cohortsSelect.innerHTML += "<option value='" + elemento["id"] + "'>" + elemento["id"] + "</option>";
                }
            });
            cohortsSelect.addEventListener("change", (e) => {
                if (e.target.value === "lim-2018-03-pre-core-pw") {

                    document.getElementById('selectCenters').style.display = "none";
                    document.getElementById('contenidoData').style.display = "block";
                    // cargarDatosProgress();
                }
            });
        })
        .catch(error =>
            console.error('Error: Nat algo haces mal', error));
    document.getElementById('contenido').style.display = "none";
    document.getElementById('selectCenters').style.display = "block";
})

btndashB.addEventListener("click", () => {

    document.getElementById('contenidoData').style.display = "none";
    document.getElementById('selectCenters').style.display = "none";
    document.getElementById('contenidoFiltros').style.display = "none";
    document.getElementById('contenido').style.display = "block";

})

const getAllData = (cb) => {
    fetch('../data/cohorts.json')
        .then(function (responseC) {
            fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
                .then(function (responseU) {
                    fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
                        .then(function (responseP) {
                            Promise.all([responseC.json(), responseU.json(), responseP.json()])
                                .then(data => {
                                    // console.log(data);
                                    const [cohorts, users, progress] = data;
                                    cb(cohorts, users, progress);
                                })
                        })
                })
        })
}

btnfiltro.addEventListener('change', (e) => {

    if (e.target.value === "students") {
        getAllData((cohorts, users, progress) => {
            let celda = '';
            let datoLectura = 0, datoGeneralLectura = 0;
            let datoQuiz = 0, datoGeneralQuiz = 0;
            let datoEjercicio = 0, datoGeneralEjercicio = 0;
            celda += '<tr id="cabecera">' +
                        '<th> NAME </th>' +
                        '<th> EJERCICIO </th>' +
                        '<th> LECTURAS </th>' +
                        '<th> QUIZZES </th>' +
                    '</tr>'

    users.forEach((user)=>{
        let progressTotalQ=0, calcularEjercicio=0,calcularLectura=0,calcularQuiz=0, QuizzeProgress=0;
            const userId = user.id;
            const userProgress = progress[userId];
            if (userProgress && userProgress.hasOwnProperty('intro') && userProgress.intro.hasOwnProperty('units')) {
                const units = userProgress.intro.units;
                  
                const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
                    return sumProgress + units[unit].percent;
                }, 0)
                userProgressPercent = Math.round(progressTotal / Object.keys(units).length);
                    for (let value in units) {
                        const parts = units[value].parts;
                        let progressTotalQ = 0;
                        for (const part in parts) {
                            // Calcular datos de Ejercicios
                            const exercises = parts[part].exercises;
                            for (const exercise in exercises) {
                                if (exercises[exercise].hasOwnProperty("completed")) {
                                    datoGeneralEjercicio++;
                                    if (exercises[exercise].completed === 1) {
                                        datoEjercicio++;
                                    }
                                }
                            }
                            // Validacion de resultados de Ejercicios
                            if (datoEjercicio===0) {
                                calcularEjercicio = 0;
                            } else {
                                calcularEjercicio = Math.round((datoEjercicio * 100) / datoGeneralEjercicio) + "%";
                            }
                            // Calcular datos de lectura
                            if (parts[part].type === "read") {
                                if (parts[part].completed === 1) {
                                    datoLectura++;
                                }
                                datoGeneralLectura++;  // console.log(datoGeneral);
                            }
                            // Calcular datos de Preguntas
                            if (parts[part].type === "quiz") {
                                if (parts[part].completed === 1 && parts[part].hasOwnProperty("score")) {
                                    progressTotalQ += parts[part].score;
                                    datoQuiz++;
                                }
                                
                                datoGeneralQuiz++;

                            }
                        }
                        // Validacion de resultados de Preguntas con score
                        if(datoGeneralQuiz===0 ){
                            calcularQuiz=0;
                        }else{ 

                            calcularQuiz = Math.round((datoQuiz / datoGeneralQuiz) * 100);
                        }
                        if(datoQuiz===0 ){
                            QuizzeProgress=0;
                        }else{ 

                            QuizzeProgress = Math.round(progressTotalQ / datoQuiz);
                        }
                        // Validacion de resultados de Lecturas
                        if(datoGeneralLectura===0 ){
                            calcularLectura = 0;
                        }else{ 
                            calcularLectura = Math.round((datoLectura / datoGeneralLectura) * 100);
                        }
                    }
                }
                if (user.signupCohort === "lim-2018-03-pre-core-pw") {
                    celda += '<tr id="cuerpoData">' +
                        // '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
                        '<td>' + user.name + '</td>' +
                        '<td>' + calcularEjercicio + '</td>' +
                        '<td>' + calcularLectura + '</td>' +
                        '<td>' + QuizzeProgress + '</td>' +
                        '</tr>';
                }

    })
    dataStudents.innerHTML = celda;
    document.getElementById('contenidoData').style.display = "none";
    document.getElementById('contenidoFiltros').style.display = "block";     
    })
}
});
    
       