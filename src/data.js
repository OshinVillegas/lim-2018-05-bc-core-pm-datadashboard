window.computeUsersStats = (users, progress, courses) => {

};

window.sortUsers = (users, orderBy, orderDirection) => {

};

window.filterUsers = (users, search) => {
};

window.processCohortData = (options) => {

};

var request2 = new XMLHttpRequest();
request2.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
request2.onload = function () {
    if (request2.status == 200) {
        let users = JSON.parse(request2.responseText);
        console.log(users)
    }
};

request2.send();

var request3 = new XMLHttpRequest();
request3.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
request3.onload = function () {
    if (request3.status == 200) {
        progress = JSON.parse(request3.responseText);
        console.log(progress);
    }
};

request3.send();