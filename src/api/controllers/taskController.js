const Task = require('../models/taskModel');

// list all tasks
exports.listAllTasks = (req, res) => {
    Task.find({}, (error, tasks) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(tasks);
        }
    });
}

// delete all tasks
exports.deleteAllTasks = (req, res) => {
    Task.remove({}, (error, tasks) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json({message: "Tâches supprimées"});
        }
    });
}


// list todo tasks
exports.listTodoTasks = (req, res) => {
    Task.find({status:'todo'}, (error, tasks) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(tasks);
        }
    });
}

// list done tasks
exports.listDoneTasks = (req, res) => {
    Task.find({status:'done'}, (error, tasks) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(tasks);
        }
    });
}

// delete done tasks
exports.deleteDoneTasks = (req, res) => {
    Task.remove({status:'done'}, (error, tasks) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json({message: "Tâches terminées supprimées"});
        }
    });
}

exports.createATask = (req, res) => {
    let newTask = new Task(req.body);

    newTask.save((error, task) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(201);
            res.json(task);
        }
    });

}

exports.getATask = (req, res) => {
    Task.findById(req.params.task_id, (error, task) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(task);
        }
    });
}

exports.updateATask = (req, res) => {
    Task.findByIdAndUpdate(req.params.task_id, req.body, {new: true}, (error, task) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(task);
        }
    });
}

exports.deleteATask = (req, res) => {
    Task.findByIdAndRemove(req.params.task_id, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json({message: "Tâche supprimée"});
        }
    });
}
