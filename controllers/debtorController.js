const DebtorModel = require('../models/Debtors');

//POST
exports.addDebtor = async(req,res) => {
    const debtor = await req.body;
    try {
        const newDebtor = await DebtorModel.create(debtor);
            if(!newDebtor) return res.status(400).send("An error occured");
        res.status(201).json(
            {
                message: "Created Successfully!",
                "Debtor" : newDebtor 
            }
        );
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message);
    }
}

// GET
// Need to do pagination
exports.getAllDebtors= async(req,res) => {
    try {
        const debtors = await DebtorModel.find();
            if(!debtors) return res.status(404).send("No Debtors");
        res.status(200).json({Debtors : debtors});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("An error occurred");
    }
}

//GET
exports.getAllDebtorsOneSchool = async(req,res) => {
    const { id } = req.query; //the id of the school

    try {
        const allDebtors = await DebtorModel.find({School: id});
            if(!allDebtors) return res.status(404).send("Not Found!");
        res.status(200).json({"Debtors" : allDebtors});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("An error occurred");
    }
}

// GET
exports.getDebtorByName = async(req,res) => {
    const { name } = req.query;

    try {
        const query = { name: { $regex: name, $options: '$i' } };
        const debtor = await SchoolModel.find(query).select(['-updatedAt', '-__v', '-id']).lean();
            if(!debtor) return res.status(404).send("Debtor not found!");
        res.status(200).json({debtor});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//GET
exports.getDebtorById = async(req,res) => {
    const { id } = req.params;
    
    try {
        const debtor = await DebtorModel.findById(id);

        if(!debtor) return res.status(404).send("Not found!");

        res.status(200).json({debtor});
    }
    catch (err) {
        res.status(500).send(err.message);
    }
    
}

//DELETE
exports.deleteDebtor = async(req,res) => {
    const { id } = req.params;
    try{
        const deletedDebtor = await DebtorModel.findByIdAndDelete(id);
            if(!deletedDebtor) return res.status(500).send("An error occurred");
        res.status(200).json({message: "Debtor deleted successfully"});
        }
    catch(err){
        res.status(500).send(err.message);
    }
}