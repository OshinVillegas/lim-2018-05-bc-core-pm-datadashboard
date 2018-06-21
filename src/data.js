window.computeUsersStats = (users, progress, courses) => {

usersWithStats= [
        users.forEach((user)=>{
            const userId = user.id;
            const userProgress = progress[userId];
            let durationTotal="";
            let userProgressPercent = 0;
            //se determina el promedio por alumnas
            if (userProgress && userProgress.hasOwnProperty('intro') && userProgress.intro.hasOwnProperty('units')) {
                const units = userProgress.intro.units;
                const durationTot= userProgress.intro.totalDuration;
                const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
                    return sumProgress + units[unit].percent
                }, 0)
                userProgressPercent = progressTotal /  Object.keys(units).length;
                durationTotal = durationTot;
                for (let value of units){
   
                }
            }
            
            const stats={
                percent:userProgressPercent,
                exercises={
                    total:0,
                    completed:0,
                    percent:0
                },
                reads={
                    total:0,
                    completed:0,
                    percent:0
                },
                quizzes={
                    total:sdsd,
                    completed:d,
                    percent:d,
                    scoreSum:a,
                    scoreAvg:a
                }
            }
  
        },
                     users.stats = stats,
]
    return usersWithStats;
    
};

window.sortUsers = (users, orderBy, orderDirection) => {

};

window.filterUsers = (users, search) => {
};

window.processCohortData = (options) => {

};

