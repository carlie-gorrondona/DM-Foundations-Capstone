const baseURL = `http://localhost:4000/api`;
let updateId = 0;

//Callbacks
//const todaysAppointmentsCallback = ({ data: appointments }) => displayTodaysAppointments(todaysAppointments);
const appointmentsCallback = ({ data: appointments }) => displayAllAppointments(appointments);
const updateModalCallback = ({ data: appointments }) => updateAppointments(appointments);
const viewModalCallback = ({ data: appointments }) => viewAppoinmentEntry(appointments)
const errCallback = err => console.log(err);


//Appointments Page Endpoints
const getAppointments = () => axios.get(`${baseURL}/appointments`).then(appointmentsCallback).catch(errCallback);
const createAppointment = body => axios.post(`${baseURL}/appointments`, body).then(appointmentsCallback).catch(errCallback);;
const updateAppointment = (id, aBody) => axios.put(`${baseURL}/appointments/${id}`, {aBody}).then(appointmentsCallback).catch(errCallback);;
const deleteAppointment = id => axios.delete(`${baseURL}/appointments/${id}`).then(appointmentsCallback).catch(errCallback);;
const editAppointment = id => axios.get(`${baseURL}/appointments/${id}`).then(updateModalCallback).catch(errCallback);
const viewAppointment = id => axios.get(`${baseURL}/appointments/${id}`).then(viewModalCallback).catch(errCallback);

let saveNewAppointmentButton = document.getElementById('saveappointmentbutton');
var toastLive = document.getElementById('appointmentsavedtoast');
let tableBody = document.querySelector('#tablebody');

const saveNewAppointment = (event) => {
    event.preventDefault();

    var myModalEl = document.querySelector('#newappointmentmodal');
    let title = myModalEl.querySelector('#appointmenttitleinput');
    let date = myModalEl.querySelector('#appointmentdateinput');
    let time = myModalEl.querySelector('#appointmenttimeinput');
    let location = myModalEl.querySelector('#appointmentlocationinput');
    let notes = myModalEl.querySelector('#appointmentnotesinput');
    
    let appointmentObj = {
        title: title.value,
        date: date.value,
        time: time.value,
        location: location.value,
        notes: notes.value
    }

    createAppointment(appointmentObj);

    
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    toastBody = toastLive.querySelector('#toast-body');
    toastBody.innerHTML =`${appointmentObj.title}`;
    var toast = new bootstrap.Toast(toastLive)

    toast.show()

    title.value = "";
    date.value = "";
    time.value = "";
    location.value = "";
    notes.value = "";
}

saveNewAppointmentButton.addEventListener("click", saveNewAppointment);

function displayAllAppointments(arr) {
    tableBody.innerHTML = ``;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        createAppointmentRow(arr[i])
    }
}

const createAppointmentRow = (appointmentObj) => {

    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
        <td>${appointmentObj.date}</td>
        <td>${appointmentObj.time}</td>
        <td>${appointmentObj.title}</td>
        <td>${appointmentObj.location}</td>
        <td>
            <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <button class="dropdown-item" onclick="viewAppointment(${appointmentObj.id})">View</button>
                    <button class="dropdown-item" onclick="editAppointment(${appointmentObj.id})">Edit</button>
                    <button class="dropdown-item" onclick="deleteAppointment(${appointmentObj.id})">Delete</button>
                </div>
            </div>
        </td>`

        tableBody.appendChild(tableRow);
}

let updateAppointmentButton = document.getElementById('updateappointmentbutton');

const updateExistingAppointment = (event) => {
    event.preventDefault();

    var myModalEl = document.querySelector('#updateappointmentmodal');
    let title = myModalEl.querySelector('#appointmenttitleinput');
    let date = myModalEl.querySelector('#appointmentdateinput');
    let time = myModalEl.querySelector('#appointmenttimeinput');
    let location = myModalEl.querySelector('#appointmentlocationinput');
    let notes = myModalEl.querySelector('#appointmentnotesinput');
    
    let appointmentObj = {
        title: title.value,
        date: date.value,
        time: time.value,
        location: location.value,
        notes: notes.value
    }
    
    console.log("Update Appointment ID: " + updateId)
    console.log("Updated Data: " + appointmentObj)
    updateAppointment(updateId,appointmentObj);

    
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    toastBody = toastLive.querySelector('#toast-body');
    toastBody.innerHTML =`${appointmentObj.title}`;
    var toast = new bootstrap.Toast(toastLive)

    toast.show()

    title.value = "";
    date.value = "";
    time.value = "";
    location.value = "";
    notes.value = "";
}

updateAppointmentButton.addEventListener("click", updateExistingAppointment);

const updateAppointments = (appointmentObj) => {
    var myModalEl = document.querySelector('#updateappointmentmodal');
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();

    let title = myModalEl.querySelector('#appointmenttitleinput');
    let date = myModalEl.querySelector('#appointmentdateinput');
    let time = myModalEl.querySelector('#appointmenttimeinput');
    let location = myModalEl.querySelector('#appointmentlocationinput');
    let notes = myModalEl.querySelector('#appointmentnotesinput');

    title.value = appointmentObj.title;
    date.value = appointmentObj.date;
    time.value = appointmentObj.time;
    location.value = appointmentObj.location;
    notes.value = appointmentObj.notes
    updateId = appointmentObj.id
}

const viewAppoinmentEntry = (appointmentObj) => {
    var myModalEl = document.querySelector('#viewappointmentmodal');
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();

    let title = myModalEl.querySelector('#appointmenttitleinput');
    let date = myModalEl.querySelector('#appointmentdateinput');
    let time = myModalEl.querySelector('#appointmenttimeinput');
    let location = myModalEl.querySelector('#appointmentlocationinput');
    let notes = myModalEl.querySelector('#appointmentnotesinput');

    title.value = appointmentObj.title;
    date.value = appointmentObj.date;
    time.value = appointmentObj.time;
    location.value = appointmentObj.location;
    notes.value = appointmentObj.notes
    updateId = appointmentObj.id
}

getAppointments();