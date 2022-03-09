const baseURL = `http://localhost:4000/api`;

const entryCallback = ({ data: journals }) => displayEntry(journals);
const updateModalCallback = ({ data: journals }) => updateJournalEntry(journals);
const viewModalCallback = ({ data: journals }) => viewEntry(journals);
const errCallback = err => console.log(err);

//Journal Endpoints
const getJournalEntries = () => axios.get(`${baseURL}/journal`).then(entryCallback).catch(errCallback);
const createNewEntry = body => axios.post(`${baseURL}/journal`, body).then(entryCallback).catch(errCallback);
const updateEntry = (id, eBody) => axios.put(`${baseURL}/journal/${id}`, {eBody}).then(entryCallback).catch(errCallback);
const deleteEntry = id => axios.delete(`${baseURL}/journal/${id}`).then(entryCallback).catch(errCallback);
const editJournalEntry = id => axios.get(`${baseURL}/journal/${id}`).then(updateModalCallback).catch(errCallback);
const viewJournalEntry = id => axios.get(`${baseURL}/journal/${id}`).then(viewModalCallback).catch(errCallback);

var toastLive = document.getElementById('entrysavedtoast');
let tableBody = document.querySelector('#tablebody');


// Save it
let saveNewJournalEntryButton = document.getElementById('savejournalentrybutton');

const saveNewJournalEntry = (event) => {
    event.preventDefault();

    var myModalEl = document.querySelector('#newjournalmodal');
    let date = myModalEl.querySelector('#entrydateinput');
    let title = myModalEl.querySelector('#entrytitleinput');
    let body = myModalEl.querySelector('#entrybodyinput');

    let journalEntryObj = {
        date: date.value,
        title: title.value,
        body: body.value
    }
    
    createNewEntry(journalEntryObj);


    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    toastBody = toastLive.querySelector('#toast-body');
    toastBody.innerHTML =`${journalEntryObj.title}`;
    var toast = new bootstrap.Toast(toastLive)
    
    toast.show()

    date.value = "";
    title.value = "";
    body.value = "";
}

saveNewJournalEntryButton.addEventListener("click", saveNewJournalEntry);

// Update It
let updateNewJournalEntryButton = document.getElementById('updatejournalentrybutton');

//Global value set in updateJournalEntry to be used in the updateNewJournalEntry event listener
var updateId = 0

const updateNewJournalEntry = (event) => {
    event.preventDefault();

    var myModalEl = document.querySelector('#updatejournalmodal');
    let date = myModalEl.querySelector('#entrydateinput');
    let title = myModalEl.querySelector('#entrytitleinput');
    let body = myModalEl.querySelector('#entrybodyinput');

    let journalEntryObj = {
        date: date.value,
        title: title.value,
        body: body.value
    }
    
    console.log("Update Journal ID: " + updateId)
    console.log("Updated Data: " + journalEntryObj)
    updateEntry(updateId, journalEntryObj);


    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    toastBody = toastLive.querySelector('#toast-body');
    toastBody.innerHTML =`${journalEntryObj.title}`;
    var toast = new bootstrap.Toast(toastLive)
    
    toast.show()

    date.value = "";
    title.value = "";
    body.value = "";
}

updateNewJournalEntryButton.addEventListener("click", updateNewJournalEntry)

// Callback for update journal entry
const updateJournalEntry = (entryObj) => {
    var myModalEl = document.querySelector('#updatejournalmodal');
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();

    let date = myModalEl.querySelector('#entrydateinput');
    let title = myModalEl.querySelector('#entrytitleinput');
    let body = myModalEl.querySelector('#entrybodyinput');

    date.value = entryObj.date;
    title.value = entryObj.title;
    body.value = entryObj.body;
    updateId = entryObj.id
}

// Callback for update journal entry
const viewEntry = (entryObj) => {
    var myModalEl = document.querySelector('#viewjournalmodal');
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();

    let date = myModalEl.querySelector('#entrydateinput');
    let title = myModalEl.querySelector('#entrytitleinput');
    let body = myModalEl.querySelector('#entrybodyinput');

    date.value = entryObj.date;
    title.value = entryObj.title;
    body.value = entryObj.body;
    updateId = entryObj.id
}

// Callback for display
function displayEntry(arr) {
    tableBody.innerHTML = ``;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        createEntryRow(arr[i])
    }
}

const createEntryRow = (entryObj) => {

    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
        <td>${entryObj.date}</td>
        <td>${entryObj.title}</td>
        <td>
            <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <button class="dropdown-item" onclick="viewJournalEntry(${entryObj.id})">View</button>
                    <button class="dropdown-item" onclick="editJournalEntry(${entryObj.id})">Edit</button>
                    <button class="dropdown-item" onclick="deleteEntry(${entryObj.id})">Delete</button>
                </div>
            </div>
        </td>`

    tableBody.appendChild(tableRow);
}

getJournalEntries();