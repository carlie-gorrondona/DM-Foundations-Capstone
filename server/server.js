const express = require('express');
const cors = require('cors');
const controller = require('./controller.js');

const app = express();

app.use(express.json());
app.use(cors());



//ENDPOINTS
//Home Page Endpoints
app.get('/api/todolists/today', controller.getTodaysToDoList);
app.get('/api/appointments/today', controller.getTodaysAppointments);

//Appointments Page Engpoints
app.get('/api/appointments', controller.getAppointments);
app.post('/api/appointments', controller.createAppointment);
app.put('/api/appointments/:id', controller.updateAppointment);
app.delete('/api/appointments/:id', controller.deleteAppointment)
app.get('/api/appointments/:id', controller.getAppointment);

//To-Do List Page Endpoints
app.get('/api/todolists', controller.getToDoLists);
app.post('/api/todolists', controller.createToDoList);
app.put('/api/todolists/:id', controller.updateToDoList);
app.delete('/api/todolists/:id', controller.deleteToDoList);
app.get('/api/todolists/:id', controller.getToDoList);

//Journal Page Endpoints
app.get('/api/journal', controller.getJournalEntries);
app.post('/api/journal', controller.createNewEntry);
app.put('/api/journal/:id', controller.updateEntry);
app.delete('/api/journal/:id', controller.deleteEntry);
app.get('/api/journal/:id', controller.getJournalEntry);


const port = 4000;

app.listen(port, () => console.log(`Hephaestus override on Cauldron port ${port}`))