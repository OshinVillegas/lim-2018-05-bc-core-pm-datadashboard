// Dclaracion de las variables
const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents= document.getElementById("listStudents");
const cohortsSelect = document.getElementById("trainingCenters");
const resp1 = document.getElementById("respuestas1");
const showStatus= document.getElementById("status");


// // Eventos del dom
btnLima.addEventListener("click",()=>{
    // console.log(e.target.textContent);
    // document.getElementById('contenidoData').style.display="block";
    fetch ('../data/cohorts.json'). then (function (response) { 
        return response.json();
    })
    .then (function (dataCohorts) { 
        dataCohorts.sort();
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
        console.error('Error:', error));
    document.getElementById('contenido').style.display="none";
    document.getElementById('selectCenters').style.display="block";
})

btndashB.addEventListener("click",()=>{

    document.getElementById('contenidoData').style.display="none";
    document.getElementById('selectCenters').style.display="none";
    document.getElementById('contenidoFiltros').style.display="none";
    document.getElementById('contenido').style.display="block";
   
})
btnfiltro.addEventListener('change',(e)=>{

    if(e.target.value === "students"){
        fetch ('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
        .then (function (response) { 
        return response.json();
        })
        .then (function (dataUsers) {
            dataUsers.forEach((elemento) => {
        
            //se crea una lista de nombres
            let linewUp= document.createElement("ul");
            //se le asigna una clase a la etiqueta ul
            linewUp.className = "listEstudiantes";
            let linew= document.createElement("li");
            dataStudents.appendChild(linewUp);
            //se le asigna una clase a la etiqueta li
            linew.className = "listasEstudiantes";
            
            linewUp.appendChild(linew);
            let rutaDataNombres=document.createElement("a");
            rutaDataNombres.textContent = elemento["name"];
            //se le asigna una clase a la etiqueta a
            rutaDataNombres.className ="rutasNombres";
            rutaDataNombres.id ="rutasName";
            linew.appendChild(rutaDataNombres);
            })
            document.getElementById("rutasName").addEventListener("click",(e)=>{
                e.preventDefault();
                document.getElementById('contenidoFiltros').style.display="none";
                document.getElementById('estatus').style.display="block";
                fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
            .then((response) => {
                return response.json();
            })
            .then((myUser) => {
                let caracter = '';
                caracter += '<tr>';
                caracter += '<th> Nombres </th>';
                caracter += '<th> General % </th>';
                caracter += '<th> Ejercicios % </th>';
                caracter += '<th> Quiz % </th>';
                caracter += '<th> Lecturas % </th>';
                caracter += '</tr>'
                fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
                .then((response) => {
                    return response.json();
                })
                .then((myProgress) => {
                    let progresoIds = Object.entries(myProgress);
                    for (i = 0; i < myUser.length; i++) {
                    caracter += '<tr>';
                    caracter += '<td id= "nombrestabla">' + myUser[i].name + '</td>';
                    if(myProgress.hasOwnProperty(myUser[i].id)) {
                        const progressUser = myProgress[myUser[i].id];
                        if(progressUser.hasOwnProperty('intro')){
                        const intro = progressUser.intro;
                        const unitIntroduction = intro.units['01-introduction'];
                        const unitVariables = intro.units['02-variables-and-data-types'];
                        const unitUx = intro.units['03-ux-design'];
                        const resultadoExecises = unitVariables.parts['06-exercises'].completed ;
                        const resultadoQuiz = unitIntroduction.parts['04-quiz'].completed + unitVariables.parts['05-quiz'].completed + unitUx.parts['03-quiz'].completed;
                        const resultadoLecturas = unitIntroduction.parts['00-welcome-and-orientation'].completed + unitIntroduction.parts['01-growth-mindset'].completed +unitIntroduction.parts['02-why-learn-to-code'].completed + unitIntroduction.parts['03-your-first-website'].completed + unitVariables.parts['00-values-data-types-and-operators'].completed + unitVariables.parts['01-variables'].completed + unitVariables.parts['02-self-learning-MDN'].completed + unitVariables.parts['03-comments'].completed + unitUx.parts['00-development-team'].completed + unitUx.parts['01-ux-design'].completed + unitUx.parts['02-ux-design-vs-ui-design'].completed;
                        if (intro.hasOwnProperty('percent')) {
                            caracter += '<td>' + intro.percent + '</td>';
                            caracter += '<td>'+ resultadoExecises*100 +'</td>';
                            caracter += '<td>' + parseInt(resultadoQuiz * 100 / 3) + '</td>';
                            caracter += '<td>' + parseInt(resultadoLecturas * 100 / 11) + '</td>';
                            caracter += '</tr>';
                        }
                        } else {
                        caracter += '<td>No inicio</td>';
                        caracter += '<td>No inicio</td>';
                        caracter += '<td>No inicio</td>';
                        caracter += '<td>No inicio</td>';
                        caracter += '</tr>';
                        }
                        showStatus.innerHTML = caracter;
                    }
                    
                    }
                    
                })
            })

                    })
                })
        .catch(error => console.error('Error:', error));
        document.getElementById('contenidoData').style.display="none";
        document.getElementById('contenidoFiltros').style.display="block";
    }
});


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