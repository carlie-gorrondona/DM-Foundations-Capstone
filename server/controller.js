const journals = require('./data/journal.json');
const appointments = require('./data/appointment.json');
const todoList = require('./data/todolist.json')

module.exports = {

    getTodaysAppointments: (req, res) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var todayString = yyyy + '-' + mm + '-' + dd;

        var todaysAppointment = appointments.filter(element => element.date === todayString);
        res.status(200).send(todaysAppointment);
    },

    getTodaysToDoList: (req, res) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy =  String(today.getFullYear());

        var todayString = yyyy + '-' + mm + '-' + dd;
        
       var todaysList = todoList.filter(list => list.date === todayString)
       res.status(200).send(todaysList);
    },

    getToDoLists: (req, res) => {
        res.status(200).send(todoList);
    },

    getToDoList: (req, res) => {
        let index = todoList.findIndex(element => element.id === +req.params.id);
        res.status(200).send(todoList[index]);
    },


    getAppointments: (req, res) => {
        res.status(200).send(appointments);
    },

    getJournalEntries: (req, res) => {
        res.status(200).send(journals);
    },

    createAppointment: (req, res) => {
        let {title, date, time, location, notes} = req.body;

        let appointmentID = appointments.length + 1
        let newAppointment = {
            id: appointmentID,
            title, 
            date,
            time,
            location,
            notes
        }

        appointments.push(newAppointment);
        res.status(200).send(appointments);
    },

    updateAppointment: (req, res) => {
        let {aBody} = req.body;

        console.log(req.body)
        let index = appointments.findIndex(element => element.id === +req.params.id);
        appointments[index].title = aBody.title;
        appointments[index].date = aBody.date;
        appointments[index].time = aBody.time;
        appointments[index].location = aBody.location;
        appointments[index].notes = aBody.notes;

        res.status(200).send(appointments);
    },

    getAppointment: (req, res) => {
        let index = appointments.findIndex(element => element.id === +req.params.id);
        res.status(200).send(appointments[index]);
    },

    deleteAppointment: (req, res) => {
        let index = appointments.findIndex(element => element.id === +req.params.id);
        appointments.splice(index, 1);
        res.status(200).send(appointments);
    },

    createToDoList: (req, res) => {
        let {date, title, listItems} = req.body;

        let listID = todoList.length + 1
        let newToDoList = {
            id: listID,
            date,
            title,
            listItems
        }

        todoList.push(newToDoList);
        res.status(200).send(todoList);
    },

    updateToDoList: (req, res) => {
        let {lBody} = req.body;

        console.log(req.body)
        let index = todoList.findIndex(element => element.id === +req.params.id);
        todoList[index].date = lBody.date;
        todoList[index].title = lBody.title;
        todoList[index].listItems = lBody.listItems;

        res.status(200).send(todoList);
    },

    deleteToDoList: (req, res) => {
        let index = todoList.findIndex(element => element.id === +req.params.id);
        todoList.splice(index, 1);
        res.status(200).send(todoList);
    },

    createNewEntry: (req, res) => {
        let {date, title, body} = req.body;

        let journalID = journals.length + 1
        let newJournalEntry = {
            id: journalID,
            date,
            title,
            body
        }

        journals.push(newJournalEntry);
        
        res.status(200).send(journals);
    },

    updateEntry: (req, res) => {
        let {eBody} = req.body;

        let index = journals.findIndex(element => element.id === +req.params.id);
        journals[index].date = eBody.date;
        journals[index].title = eBody.title;
        journals[index].body = eBody.body;

        res.status(200).send(journals);
    },

    getJournalEntry: (req, res) => {
        let index = journals.findIndex(element => element.id === +req.params.id);
        res.status(200).send(journals[index]);
    },

    deleteEntry: (req, res) => {
        let index = journals.findIndex(element => element.id === +req.params.id);
        journals.splice(index, 1);
        res.status(200).send(journals);
    }
}