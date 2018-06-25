window.computeUsersStats = (users, progress, courses) => {
    users.forEach((user)=>{
        const userId = user.id;
        const userProgress = progress[userId];
        let datoLectura=0, datoGeneralLectura=0, datoQuiz=0, datoGeneralQuiz = 0,datoEjercicio=0, datoGeneralEjercicio=0;
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
                        if(parts[part].completed === 1){
                            datoLectura ++; 
                        }
                    datoGeneralLectura++;  // console.log(datoGeneral);
                    calcularLectura=Math.trunc((datoLectura/datoGeneralLectura)*100) + "%";
                    }                           
                    if (parts[part].type==="quiz"){
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

        
    }),

usersWithStats= [
        stats={
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
                total:datoQuiz,
                completed:datoGeneralQuiz,
                percent:calcularQuiz,
                scoreSum:a,
                scoreAvg:a
            }
        }
        users.push(stats);      
]

    return usersWithStats;
    
};

window.sortUsers = (users, orderBy, orderDirection) => {

};

window.filterUsers = (users, search) => {
};

window.processCohortData = (options) => {

};

