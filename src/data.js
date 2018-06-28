window.computeUsersStats = (users, progress, courses) => {
            let datoLectura = 0, datoGeneralLectura = 0;
            let datoQuiz = 0, datoGeneralQuiz = 0;
            let datoEjercicio = 0, datoGeneralEjercicio = 0;
            let progressTotalQuiz=0; calcularEjercicio=0,calcularLectura=0,calcularQuiz=0, QuizzeProgress=0;  
            let usuarios=users;
    users.forEach((user)=>{
        if(user.role==="student"){
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
                                progressTotalQuiz += parts[part].score;
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

                        QuizzeProgress = Math.round(progressTotalQuiz / datoQuiz);
                    }
                    // Validacion de resultados de Lecturas
                    if(datoGeneralLectura===0 ){
                        calcularLectura = 0;
                    }else{ 
                        calcularLectura = Math.round((datoLectura / datoGeneralLectura) * 100);
                    }
                }
            }
        }
    const usersWithStats= {
                percent:userProgressPercent,
                exercises:{
                    total:datoGeneralEjercicio,
                    completed:datoEjercicio,
                    percent:calcularEjercicio
                },
                reads:{
                    total:datoGeneralLectura,
                    completed:datoLectura,
                    percent:calcularLectura
                },
                quizzes:{
                    total:datoGeneralQuiz,
                    completed:datoQuiz,
                    percent:calcularQuiz,
                    scoreSum:progressTotalQuiz,
                    scoreAvg:QuizzeProgress
                }
            
        }
        user.stats=usersWithStats ;
    });

return usuarios;

};

window.sortUsers = (users, orderBy, orderDirection) => { 
    if(orderBy === "name" && orderDirection === "Ascendente"){
        users.sort((primerD,segundoD)=>{
            if(primerD.name > segundoD.name){
                return 1;
            }else if(primerD.name < segundoD.name){
                return -1;
            }
            return 0;
        })
    }
    if(orderBy === "completitud" && orderDirection === "Ascendente"){
        users.sort((primerD,segundoD)=>{
            if(primerD.stats.percent > segundoD.stats.percent){
                return 1;
            }else if(primerD.stats.percent < segundoD.stats.percent){
                return -1;
            }
            return 0;
        })
    }
    if(orderBy === "Ejercicios" && orderDirection === "Ascendente"){
        users.sort((primerD,segundoD)=>{
            if(primerD.stats.exercises.percent > segundoD.stats.exercises.percent){
                return 1;
            }else if(primerD.stats.exercises.percente < segundoD.stats.exercises.percent){
                return -1;
            }
            return 0;
        })
    }
    if(orderBy === "Lecturas" && orderDirection === "Ascendente"){
        users.sort((primerD,segundoD)=>{
            if(primerD.stats.reads.percent > segundoD.stats.reads.percent){
                return 1;
            }else if(primerD.stats.reads.percent < segundoD.stats.reads.percent){
                return -1;
            }
            return 0;
        })
    }
    if(orderBy === "Quizzes" && orderDirection === "Ascendente"){
        users.sort((primerD,segundoD)=>{
            if(primerD.stats.quizzes.percent > segundoD.stats.quizzes.percent){
                return 1;
            }else if(primerD.stats.quizzes.percent < segundoD.stats.quizzes.percent){
                return -1;
            }
            return 0;
        })
    }

    
};

window.filterUsers = (users, search) => {
};

window.processCohortData = (options) => {
};