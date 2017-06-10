var express = require('express');
var router = express.Router();

var Task = require('../models/task');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	Task.getUserByDescription('1234', function(err, tasks){
	    if(err){
	        console.log(err);
	        res.json(err);
	    }
	    else{
	        console.log(tasks);
					res.render('index');
	    }
	});

	//res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/home');
	}
}

// new task
router.get('/newtask', function(req, res){
	res.render('newtask');
});


//post a description
router.post('/newtask',function(req, res){

	var description = req.body.description;

	// Validation
	req.checkBody('description', 'description is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		req.flash('error_msg', 'Description cannot be null');
		res.render('newtask',{
			errors:errors
		});
	}
	else {
		var newtask = new Task({
				description: description
		});


		Task.createTask(newtask, function(err, user){
				if(err) throw err;
				console.log(newtask);
		});

		req.flash('success_msg', 'Successly Adding a new task');

		res.redirect('/');
	}
});

module.exports = router;
