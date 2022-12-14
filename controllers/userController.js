const SchoolModel = require('../models/School');


/**
 * reset password
 * comment on a post
 * get all debtors from one school
*/

//PATCH
exports.resetUserPassword = async(req,res) => {
    
}



//GET
//need to do pagination
exports.getAllSchools= async(req,res) => {
    try {
        const schools = await SchoolModel.find();
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

