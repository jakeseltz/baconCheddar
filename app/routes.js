/* create the following

Home Page (/)
Login Page (/login)
Signup Page (/signup)
Handle the POST for both login
Handle the POST for both signup
Profile Page (after logged in)

*/



//app/routes.js



module.exports = function(app,passport){

	var mongoose = require('mongoose');
	var User = mongoose.model('User');
	var Expense = mongoose.model('Expense');

	app.get('/', isLoggedIn, function(req,res){
		res.redirect('/profile');
	});


	app.get('/login', function(req,res){
		res.render('login.ejs', {message: req.flash('loginMessage')})
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFLash: true
	}));


	app.get('/signup', function(req,res){
		res.render('signup.ejs', {message: req.flash('signupMessage')})
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFLash : true
	}));


	app.get('/profile', isLoggedIn, function(req,res){

		Expense
    	.find({ user: req.user._id})
    	.select('cost desc')
    	.exec(function (err, expense) {
    		if (err) return handleError(err);
    		console.log(expense) 
    	});



		res.render('profile.ejs', {
			user : req.user
		});
	});


	app.post('/profile',isLoggedIn, function(req, res) {
 		
 		var expense = new Expense(req.body);
 		expense.user = req.user._id;

 		//console.log(expense.user)
 		//console.log(expense)


 		expense.save(function(err, user){
 			if(err){ return next(err); }

    	
    	 req.user.expenses.push(expense);
    	 req.user.save(function(err, user) {
    	 	if(err){ return next(err); }

    });
  });

 		res.render('profile.ejs', {
			user : req.user
		});
});




	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});

};


function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.render('index.ejs');
}




