var mongoose = require('mongoose');

var expenseSchema = mongoose.Schema({
	cost: String,
	desc: String,
	user: {type: String, ref: 'User'}
});


module.exports = mongoose.model('Expense',expenseSchema);
