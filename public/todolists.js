const baseURL = `http://localhost:4000/api`;
var updateId = 0

const listsCallback = ({ data: todoList }) => displayLists(todoList);
const errCallback = err => console.log(err);
const updateModalCallback = ({ data: todoList }) => updateToDoListCB(todoList);


//To-Do List Endpoints
const getToDoLists = () => axios.get(`${baseURL}/todolists`).then(listsCallback).catch(errCallback);
const createToDoList = body => axios.post(`${baseURL}/todolists/`, body).then(listsCallback).catch(errCallback);
const updateToDoList = (id, lBody) => axios.put(`${baseURL}/todolists/${id}`, {lBody}).then(listsCallback).catch(errCallback);
const deleteToDoList = id => axios.delete(`${baseURL}/todolists/${id}`).then(listsCallback).catch(errCallback);
const editTDList = id => axios.get(`${baseURL}/todolists/${id}`).then(updateModalCallback).catch(errCallback);


let addAnotherItemButton = document.getElementById('additembutton');
let addAnotherItemButton2 = document.getElementById('additembutton2');
let saveListButton = document.getElementById('savebutton');
let updateListButton = document.getElementById('updatebutton');
let listAccordion = document.querySelector('#listaccordion');

getToDoLists();

var toastLive = document.getElementById('entrysavedtoast');

// add item event
const addItem = (event) => {
    event.preventDefault();

    var myModalEl2 = document.querySelector('#save-modal2');
    var listFormBody = myModalEl2.querySelector('#list-form-body');
    const container = document.createElement('div');
    container.innerHTML = `
    <label for="listiteminput" class="form-label" id="listitem">Item:</label>
    <input type="text" class="form-control" id="listiteminput">`
    listFormBody.append(container);

}

const addItem2 = (event) => {
    event.preventDefault();

    var myModalEl2 = document.querySelector('#update-modal2');
    var listFormBody = myModalEl2.querySelector('#list-form-body');
    const container = document.createElement('div');
    container.innerHTML = `
    <label for="listiteminput" class="form-label" id="listitem">Item:</label>
    <input type="text" class="form-control" id="listiteminput">`
    listFormBody.append(container);

}

// updater event
const updateList = (event) => {
    event.preventDefault();

    var myModalEl = document.querySelector('#update-modal1');
    let date = myModalEl.querySelector('#listdateinput');
    let title = myModalEl.querySelector('#listtitleinput');


    var myModalEl2 = document.querySelector('#update-modal2');
    var listFormBody = myModalEl2.querySelector('#list-form-body');
    let userInputs = listFormBody.querySelectorAll('#listiteminput');
   
    // loop to get values for inputs 
    const updatedList = []
    for (var i = 0; i < userInputs.length; i++) {
        updatedList[i] = userInputs[i].value
    }


    let listObj = {
        date: date.value,
        title: title.value,
        listItems: updatedList
    }
    
    console.log("Update TodoLists ID: " + updateId)
    console.log("Updated Data: " + listObj)
    updateToDoList(updateId, listObj);


    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    var modal2 = bootstrap.Modal.getInstance(myModalEl2);
    modal2.hide();

    toastBody = toastLive.querySelector('#toast-body');
    toastBody.innerHTML =`${listObj.title}`;
    var toast = new bootstrap.Toast(toastLive)
    
    toast.show()

    date.value = "";
    title.value = "";
    listFormBody.innerHTML = ``
}

// save new list event
const saveList = (event) => {
    event.preventDefault();

    var myModalEl = document.querySelector('#save-modal1');
    let date = myModalEl.querySelector('#listdateinput');
    let title = myModalEl.querySelector('#listtitleinput');


    var myModalEl2 = document.querySelector('#save-modal2');
    var listFormBody = myModalEl2.querySelector('#list-form-body');
    let userInputs = listFormBody.querySelectorAll('#listiteminput');
   
    // loop to get values for inputs 
    const saveList = []
    for (var i = 0; i < userInputs.length; i++) {
        saveList[i] = userInputs[i].value
    }


    let listObj = {
        date: date.value,
        title: title.value,
        listItems: saveList
    }
    
    console.log("Updated Data: " + listObj)
    createToDoList(listObj);


    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    var modal2 = bootstrap.Modal.getInstance(myModalEl2);
    modal2.hide();

    toastBody = toastLive.querySelector('#toast-body');
    toastBody.innerHTML =`${listObj.title}`;
    var toast = new bootstrap.Toast(toastLive)
    
    toast.show()

    date.value = "";
    title.value = "";
    listFormBody.innerHTML = ``
}


/*
    Callback for edit button
*/
const updateToDoListCB = (listObj) => {
    var myModalEl = document.querySelector('#update-modal1');
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();

    // Load up the data for the first modal
    var date = myModalEl.querySelector('#listdateinput');
    var title = myModalEl.querySelector('#listtitleinput');
    date.value = listObj.date;
    title.value = listObj.title;

    // Adds the input fields for each individual Todo Item
    var items = listObj.listItems
    var myModalEl2 = document.querySelector('#update-modal2');
    var listFormBody = myModalEl2.querySelector('#list-form-body');
    listFormBody.innerHTML = ``
    for (let i = 0; i < items.length; i++) {
        const container = document.createElement('div');
        container.innerHTML = `
        <label for="listiteminput" class="form-label" id="listitem">Item:</label>
        <input type="text" class="form-control" id="listiteminput" value="${items[i]}">`
        listFormBody.append(container)
    }

    updateId = listObj.id
}

// Callback for displayList
function displayLists(arr) {
    listAccordion.innerHTML = ``;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        createAccordionRow(arr[i])
    }
}

// displaylist helper loop
const createAccordionRow = (listObj) => {
    const accordionRow = document.createElement('div');
    // set to bootstrap class component
    accordionRow.className = "accordion-item"
    accordionRow.innerHTML = `
        <h2 class="accordion-header" id="heading-${listObj.id}">
            <button class="accordion-button collapsed  border border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${listObj.id}" aria-expanded="true" aria-controls="collapse-${listObj.id}">
            ${listObj.title}
            
        </h2>
        <div id="collapse-${listObj.id}" class="accordion-collapse collapse" aria-labelledby="heading-${listObj.id}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <ul id="todolist">
                </ul>
                <button class="btn btn-success border border-dark" type="button" onclick="editTDList(${listObj.id})">Edit</button>
                <button class="btn btn-success border border-dark" type="button" onclick="deleteToDoList(${listObj.id})">Delete</button>
            </div>
        </div>
    </div>`
    
    var items = listObj.listItems
    let ul = accordionRow.querySelector('#todolist');
    ul.innerHTML = ``;

    for (let i = 0; i < items.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${items[i]}`
        ul.appendChild(li)
    }

    listAccordion.appendChild(accordionRow)
}



// Event Listeners
updateListButton.addEventListener("click", updateList);
saveListButton.addEventListener("click", saveList);
addAnotherItemButton.addEventListener("click", addItem);
addAnotherItemButton2.addEventListener("click", addItem2);