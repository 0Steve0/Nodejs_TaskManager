/*
 * This the model for task
 */
var mongoose = require('mongoose');

// Task Schema
var TaskSchema = mongoose.Schema({
	description: {
		type: String
	}
});


var Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.createTask = function(newTask, callback){
	        newTask.save(callback);
}

module.exports.getUserByDescription = function(description, callback){
	var query = {description: description};
	Task.find(query, callback);
}
