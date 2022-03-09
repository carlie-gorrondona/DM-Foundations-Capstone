
const baseURL = `http://localhost:4000/api`;

//CALLBACK
const listsCallback = ({ data: lists }) => displayTodaysList(lists);
const appointmentsCallback = ({ data: appointments }) => displayTodaysAppointments(appointments);
const entryCallback = ({ data: entry }) => displayEntry(todaysEntry);
const errCallback = err => console.log(err);

//ENDPOINTS
//Home Page Endpoints
// const callback = ({data:todolist}) => displayLists(todolist);
const getTodaysToDoList = () => axios.get(`${baseURL}/todolists/today`).then(listsCallback).catch(errCallback);
const getTodaysAppointments = () => axios.get(`${baseURL}/appointments/today`).then(appointmentsCallback).catch(errCallback);

let toDoListList = document.querySelector('.todolistcontainer');
let appointmentList = document.querySelector('.appointmentscontainer')

function displayTodaysList(arr) {
    toDoListList.innerHTML = ``;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        createList(arr[i])
    }
}

function displayTodaysAppointments(arr) {
    appointmentList.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
        createAppList(arr[i]);
    }
}

const createList = (listObj) => {

    const listTitle = document.createElement('h6');
    listTitle.className = "listtitle";
    listTitle.innerHTML = `${listObj.title}`;
    listTitle.style = 'margin: 20px 0 0 90px;'

    let items = listObj.listItems;
    const ul = document.createElement('ul');
    ul.id = "ullist";
    ul.style = 'margin: 0 0 0 90px;'
    ul.innerHTML = ``;

    for (let i = 0; i < items.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${items[i]}`
        ul.appendChild(li);
    }

    toDoListList.appendChild(listTitle);
    toDoListList.appendChild(ul)
}

const createAppList = (appObj) => {
    const appTitle = document.createElement('h6');
    appTitle.className = 'apptitle';
    appTitle.innerHTML = `${appObj.time} - ${appObj.title}`

    appointmentList.appendChild(appTitle);
}


getTodaysToDoList();
getTodaysAppointments();













