const tranferModel = require('../models/transfer');
const User = require('../models/user');

module.exports.tranfer = async function (req, res) {
    try {
        let trans = await tranferModel.find({});
        let sender = await User.findById(req.params.id);
        let receiver = await User.findOne({ name: req.body.receiver });

        let Tranfer = await tranferModel.create({
            transferId: trans.length + 1,
            sender: sender.name,
            receiver: req.body.receiver,
            amount: req.body.amount,
        });

        console.log("Balance sender", sender.balance - req.body.amount);

        if (sender.balance >= req.body.amount) {
            await User.findByIdAndUpdate(req.params.id, { balance: sender.balance - req.body.amount });
            await User.findOneAndUpdate({ name: req.body.receiver }, { balance: receiver.balance + Number(req.body.amount) });
            req.flash('success',"Amount is transfered Successfully!!");
        }
        else {
            req.flash('error',"Balance is too low to transfer");
            console.log("Error");
        }

        return res.redirect('/customer/transfer-record');

    } catch (error) {
        console.log("Error while creating tranfer", error);
        return;
    }
}

