// Dclaracion de las variables
const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents= document.getElementById("tablaUsers");
const cohortsSelect = document.getElementById("trainingCenters");
const resp1 = document.getElementById("respuestas1");

// // Eventos del dom
btnLima.addEventListener("click",()=>{
    // console.log(e.target.textContent);
    // document.getElementById('contenidoData').style.display="block";
    fetch ('../data/cohorts.json'). then (function (response) { 
        return response.json();
    })
    .then (function (dataCohorts) { 
        dataCohorts.forEach((elemento) => {
            if(elemento["id"].substring(0,3)=== "lim"){
            cohortsSelect.innerHTML += "<option value='"+elemento["id"]+"'>"+elemento["id"]+"</option>";
            }
        }); 
        cohortsSelect.addEventListener("change",(e)=>{
            if(e.target.value === "lim-2018-03-pre-core-pw") {
                
                document.getElementById('selectCenters').style.display="none";
                document.getElementById('contenidoData').style.display="block";
                // cargarDatosProgress();
            }
            }); 
    })
    .catch(error => 
        console.error('Error: Nat algo haces mal', error));
    document.getElementById('contenido').style.display="none";
    document.getElementById('selectCenters').style.display="block";
})

btndashB.addEventListener("click",()=>{

    document.getElementById('contenidoData').style.display="none";
    document.getElementById('selectCenters').style.display="none";
    document.getElementById('contenidoFiltros').style.display="none";
    document.getElementById('contenido').style.display="block";
   
})

const getAllData = (cb) => {
    fetch ('../data/cohorts.json')
        .then (function (responseC) {
        fetch ('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
            .then (function (responseU) { 
                fetch ('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
                    .then (function (responseP) {
                        Promise.all([ responseC.json(), responseU.json(), responseP.json()])
                            .then(data => {
                                // console.log(data);
                                const [cohorts, users, progress] = data;
                                cb(cohorts, users, progress);
                            })
                    })
            })
    })
}

btnfiltro.addEventListener('change',(e)=>{

    if(e.target.value === "students"){
        getAllData( (cohorts, users, progress) => {
            //computeUserStats(users,progress,cohorts.courses);
            let celda = '';
            celda += '<tr id="cabecera">'+
                        '<th> NAME </th>'+
                        '<th> EJERCICIO </th>'+
                        '<th> LECTURAS </th>'+
                        '<th> QUIZZES </th>'+
                    '</tr>'
            users.forEach((user)=>{
                const userId = user.id;
                const userProgress = progress[userId];
                let datoLectura=0;
                let datoGeneralLectura=0;
                let datoQuiz=0;
                let datoGeneralQuiz = 0;
                let datoEjercicio=0;
                let datoGeneralEjercicio=0;
                // se determina el promedio por alumnas
                if (userProgress && userProgress.hasOwnProperty('intro') && userProgress.intro.hasOwnProperty('units')) {
                    const units = userProgress.intro.units;
                    const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
                        return sumProgress + units[unit].percent;
                    }, 0)
                    userProgressPercent =Math.trunc(progressTotal/ Object.keys(units).length) + "%";

                    for(let value in units){
                        const parts = units[value].parts;
                        for (const part in parts) {
                            const exercises= parts[part].exercises;
                            for (const exercise in exercises) { 
                                        if(exercises[exercise].hasOwnProperty("completed")){
                                            datoGeneralEjercicio++;
                                            if(exercises[exercise].completed === 1){
                                                datoEjercicio++;
                                            }
                                            calcularEjercicio=Math.trunc((datoEjercicio*100)/datoGeneralEjercicio) + "%";
                                        }
                            }
                            if (parts[part].type === "read"){
                                debugger
                                if(parts[part].completed === 1){
                                    datoLectura ++; 
                                }
                            datoGeneralLectura++;  // console.log(datoGeneral);
                            calcularLectura=Math.trunc((datoLectura/datoGeneralLectura)*100) + "%";
                            if (parts[part].type ==="quiz"){
                                
                                 if(parts[part].hasOwnProperty("score")){
                                    console.log("tiene");
                                 }else{
                                     console.log("no tiene");
                                 }
                                if(parts[part].completed === 1){
                                    datoQuiz ++;
                                    // console.log(dato);
                                }
                            datoGeneralQuiz++;
                            calcularQuiz=Math.trunc((datoQuiz/datoGeneralQuiz)*100) + "%";
                            }
                        }   
                        }                           
                            
                    }   
                }

                if(user.signupCohort==="lim-2018-03-pre-core-pw"){
                    celda += '<tr id="cuerpoData">'+
                                // '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
                                '<td>' + user.name + '</td>'+
                                '<td>'+ calcularEjercicio +'</td>'+
                                '<td>' + calcularLectura + '</td>'+
                               // '<td>' + calcularQuiz + '</td>'+
                            '</tr>';
                }
            })
            
            dataStudents.innerHTML = celda;
            document.getElementById('contenidoData').style.display="none";
            document.getElementById('contenidoFiltros').style.display="block";
        })
    }
});
        // //se crea una lista de nombres
            // let linewUp= document.createElement("ul");
            // //se le asigna una clase a la etiqueta ul
            // linewUp.className = "listEstudiantes";
            // let linew= document.createElement("li");
            // dataStudents.appendChild(linewUp);
            // //se le asigna una clase a la etiqueta li
            // linew.className = "listasEstudiantes";
            
            // linewUp.appendChild(linew);
            // let rutaDataNombres=document.createElement("a");
            // rutaDataNombres.textContent = elemento["name"];
            // //se le asigna una clase a la etiqueta a
            // rutaDataNombres.className ="rutasNombres";
            // rutaDataNombres.id ="rutasName";
            // linew.appendChild(rutaDataNombres);
            // console.log(document.getElementById("rutasName")[0]);
            // })       
            // document.getElementById("rutasName").addEventListener("click",(e)=>{
            //     e.preventDefault();
                
            //     document.getElementById('contenidoFiltros').style.display="none";
            //     document.getElementById('estatus').style.display="block";
            //     fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((myUser) => {
                   
            //     })
                
            // })

// function cargandodataQuizzes(jsonObj){
    //     let progress= Object.keys(jsonObj);
    
    //     // console.log(jsonObj);
    //     for (let i = 0; i < progress.length; i++) {
    //         const element = progress[i];
    //         // const propiedadElemento = jsonObj[element].intro;
    //         // const porpiedadDura=jsonObj[element].intro.totalDuration;
    //         const porpiedadDura=jsonObj[element].intro.units[i];
    //         const porpiedadDur=jsonObj[porpiedadDura];
    
    //         console.log(porpiedadDur);
                    
    //     }
        
    // }

    // function cargarDatosProgress(){
//     let request = new XMLHttpRequest(); 
//     request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
//     request.onload = function () {
//       if(request.status === 200){
//        let progressQuizzes = JSON.parse(request.response);
//        cargandodataQuizzes(progressQuizzes);
//         }
//     }
//     request.send();
// }