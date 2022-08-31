const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    status : {
        type: String,
        default: 'todo'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);