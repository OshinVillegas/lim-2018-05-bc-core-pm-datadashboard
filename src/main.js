// Dclaracion de las variables
const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents = document.getElementById("tablaUsers");
const cohortsSelect = document.getElementById("trainingCenters");
const resp1 = document.getElementById("respuestas1");
const selectOrderBy= document.getElementById("filtroPorOrderBy").value;
const selectDirection=document.getElementById("filtroPorDirection").value;


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
                                    console.log(data);

                                })
                        })
                })
        })
}
btnfiltro.addEventListener('change', (e) => {
    if (e.target.value === "students") {
        getAllData((cohorts, users, progress) => {
            let celda = '';
            celda += '<tr id="cabecera">' +
                        '<th> NAME </th>' +
                        '<th> EJERCICIO </th>' +
                        '<th> LECTURAS </th>' +
                        '<th> QUIZZES </th>' +
                    '</tr>'
            const onlyUnique = (value, index, self) => {
                return self.indexOf(value) === index;
            }
            let courses = [];
            cohorts.forEach((c) => {
                if(c.hasOwnProperty("coursesIndex")){
                    courses.concat(Object.keys(c.coursesIndex));
                    console.log(coursesC)

                }
            });
            coursesC = courses.filter(onlyUnique).sort();

            const usersWithStats = computeUsersStats(users, progress, coursesC);

            selectOrderBy.addEventListener("onchange",()=>{
                if()
                sortUsers(usersWithStats,optionsBy,As);

            })
            selectDirection.addEventListener("onchange",()=>{
                const optionsDirections=optionsDirection[selectDirection.value];
                sortUsers(usersWithStats,optionsBy,optionsDirections);
            })

            

            usersWithStats.forEach((user)=>{
                console.log(user);
                celda += '<tr id="cuerpoData">' +
                    // '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
                            '<td>' + user.name + '</td>' +
                            '<td>' + user.stats.exercises.percent + '</td>' +
                            '<td>' + user.stats.reads.percent + '</td>' +
                            '<td>' + user.stats.quizzes.percent + '</td>' +
                        '</tr>';
    })
    dataStudents.innerHTML = celda;
    document.getElementById('contenidoData').style.display = "none";
    document.getElementById('contenidoFiltros').style.display = "block";     
    })
}
});
    
       