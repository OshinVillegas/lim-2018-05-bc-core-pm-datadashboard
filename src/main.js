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
    fetch ('../data/cohorts.json')
    .then (function (response) { 
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
            celda += '<tr id="cabecera">';
                celda += '<th> Id </th>';
                celda += '<th> Name </th>';
                celda += '<th> SignupCohorts </th>';
                celda += '<th> Ejercicios </th>';
                celda += '<th> Lecturas </th>';
                celda += '<th> Quizzes </th>';
                celda += '</tr>'
            users.forEach((user)=>{
                const userId = user.id;
                const userProgress = progress[userId];
                // let durationTotal="";
                // let userProgressPercent = 0;
                let contadorLectura = 0;
                let contadorQuizzes = 0;
                let contadorEjercicios = 0;
                // se determina el promedio por alumnas
                if (userProgress && userProgress.hasOwnProperty('intro') && userProgress.intro.hasOwnProperty('units')) {
                    const units = userProgress.intro.units;
                    const durationTot= userProgress.intro.totalDuration;
                    const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
                        return sumProgress + units[unit].percent
                    }, 0)
                    // console.log(userProgress.intro.units);
                    userProgressPercent =(progressTotal/ Object.keys(units).length) + "%";
                    durationTotal = durationTot;
                    // console.log(userProgressPercent)


                    for(let value in units){
                        const parts = units[value].parts;
                        for (const part in parts) {
                            // if (object.hasOwnProperty(key)) {
                            //     const element = object[key];
                                
                            // }

                            if (parts[part].type==="read"){
                                contadorLectura = Object.keys(parts).reduce((sumProgress, unit) => {
                                    return sumProgress + parts[unit].completed
                                }, 0)
                            
                            }
                            if (parts[part].type==="practice"){
                                contadorEjercicios = Object.keys(parts).reduce((sumProgress, unit) => {
                                    return sumProgress + parts[unit].completed
                                }, 0)
                            }
                            if (parts[part].type==="quiz"){
                                contadorQuizzes = Object.keys(parts).reduce((sumProgress, unit) => {
                                    return sumProgress + parts[unit].completed
                                }, 0)
                            }
                        }
                    }   
                    console.log(contadorEjercicios);    
                    console.log(contadorLectura);                    
                    console.log(contadorQuizzes);                    
                
                    
                }

                if(user.signupCohort==="lim-2018-03-pre-core-pw"){
                    celda += '<tr id="cuerpoData">';
                    celda += '<td id= "nombrestabla"><a href="" id="usersEstadisticas">' + user.id + '</a></td>';
                    celda += '<td>' + user.name + '</td>';
                    celda += '<td>'+ user.signupCohort +'</td>';
                    celda += '<td>' + contadorEjercicios + '</td>';
                    celda += '<td>' + contadorLectura + '</td>';
                    celda += '<td>' + contadorQuizzes + '</td>';

                    celda += '</tr>';
                }
            })
            
            dataStudents.innerHTML = celda;
            document.getElementById('contenidoData').style.display="none";
            document.getElementById('contenidoFiltros').style.display="block";
        })
    }
});
btnfiltro.addEventListener('change', () => {
    
        fetch("../data/cohorts/lim-2018-03-pre-core-pw/progress.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (partss){
            for(list in partss){
                console.log(list)
            }
            
        }) 
    document.getElementById('contenidoData').style.display = "none";
    document.getElementById('contenidoFiltros').style.display = "block";
}) 
