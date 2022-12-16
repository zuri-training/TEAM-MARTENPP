const SchoolModel = require('../models/School');
const debtor = require('../controllers/debtorController');

/**
 * reset password
 * comment on a post
 * create a contend
*/

//PATCH
exports.updateProfile = async(req,res) => {
    const { body, school } = req;
    const id = school._id;

    try {
        const profile = await SchoolModel.findByIdAndUpdate(id, body);
            if(!profile) return res.status(404).send("An error occurred");
        res.status(200).send("Profile updated successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

exports.updateDebtor = async(req,res) => {
    const { body, student } = req;
    const id = student._id;

    try {
        const updatedDebtor = await debtor.editDebtor(id, body);
            if(!updatedDebtor) return res.status(404).send("An error occurred");
        res.status(200).send("Debtor updated successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}


//GET
//need to do pagination
exports.getAllSchools= async(req,res) => {
    try {
        const schools = await SchoolModel.find().select(['-password']);
            if(!schools) return res.status(404).send("No Schools");
        res.status(200).json({Schools : schools});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("An error occurred");
    }
}



//GET
exports.getSchoolByName = async(req,res) => {
    const { name } = req.query;

    try {
        const query = { name: { $regex: name, $options: '$i' } };
        const school = await SchoolModel.find(query).select(['-password', '-updatedAt', '-__v', '-id']).lean();
            if(!school) return res.status(404).send("School not found!");
        res.status(200).json({school});
    } catch (err) {
        res.status(500).send(err.message);
    }
}


//GET
exports.getSchoolById = async(req,res) => {
    const { id } = req.params;
    
    try {
        const school = await SchoolModel.findById(id);

        if(!school) return res.status(404).send("School not found!");

        res.status(200).json({school});
    }
    catch (err) {
        res.status(500).send(err.message);
    }
    
}


//POST
exports.addDebtor = async(req,res) => {
    const { body, user } = req;
    const id = user._id; //id of the school

    const data = {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        debt: body.amountOwed,
        dateJoined: body.dateJoined,
        exitDate: body.exitDate,
        School: id,
    }
    try {
        const newDebtor = await debtor.createDebtor(data);
            if(!newDebtor) return res.status(500).send("Internal Server Error");
            res.status(201).json(
            {
                message: "Created Successfully!",
                "Debtor" : newDebtor 
            }
        );
    } catch (err) {
        console.error(err.message)
        res.status(500).send(err.message);
    }
}


//GET
//If this doesnt work, create a function in the debtor controller 
// that gets all debtors from one school and just link this with that
exports.getAllDebtorsOneSchool = async(req,res) => {
    const { id } = req.query; //the id of the school

    try {
        const allDebtors = await SchoolModel.find({School: id}).populate('Debtors');
            if(!allDebtors) return res.status(404).send("Not Found!");
        res.status(200).json({"Debtors" : allDebtors});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("An error occurred");
    }
}


//DELETE
exports.removeDebtor = async(req,res) => {
    const { id } = req.params;
    try {
        const deletedDebtor = await debtor.deleteDebtor(id);
            if(!deletedDebtor) return res.status(500).send("An error occurred");
        res.status(200).json({
            message: "Debtor deleted successfully"
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.deleteUser = async(req,res) => {
    const { id } = req.params;
    try{
        const deletedUser = await SchoolModel.findByIdAndDelete(id);
            if(!deletedUser) return res.status(500).send("An error occurred");
        res.status(200).json({message: "User deleted successfully"});
        }
    catch(err){
        res.status(500).send(err.message);
    }
}

