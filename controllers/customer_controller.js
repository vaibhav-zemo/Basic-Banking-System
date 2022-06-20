const user = require('../models/user');
const Transfer = require('../models/transfer');

module.exports.transfer_record = async function (req, res) {
    try {
        const transfer = await Transfer.find({});
        return res.render('record', {
            title: 'Tranfer Record',
            tranferDetail: transfer,
            req: req,
        });
    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.customer = async function (req, res) {
    console.log(req.originalUrl);
    let users = await user.find({}).sort('customerId');
    return res.render('customer', {
        title: 'ViewCustomer',
        customer: users,
        req: req,
    })
}

module.exports.transfer = async function (req, res) {
    try {
        let allCustomer = await user.find({}).sort('customerId');
        let users = await user.findById(req.params.id);
        return res.render('transfer', {
            title: 'Transfer',
            User: users,
            Customers: allCustomer,
            req: req,
        })
    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.createCustomer = async function (req, res) {
    return res.render('create_customer', {
        title: 'Create-Customer',
        req: req,
    });
}

module.exports.createSession = async function (req, res) {
    try {

        let Users = await user.find({});
        let customer = await user.create({
            name: req.body.first + " " + req.body.last,
            email: req.body.email,
            balance: req.body.amount,
            customerId: Users.length + 1,
        });

        req.flash('success',"New Customer is Created!!");
        return res.redirect('/customer');

    } catch (error) {
        console.log("Error while creating customer", error);
        return;
    }
}  