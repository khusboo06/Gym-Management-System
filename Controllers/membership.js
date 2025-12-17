const Membership=require('../Modals/membership');

exports.addMembership = async (req,res)=>{
    try{
        const {months,price} =req.body;
        const memberShip=await Membership.findOne({gym:req.gym._id,months});
        if(memberShip){
            memberShip.price=price;
            await memberShip.save();
            res.status(200).json({
                message:"Updated Successfully"
            })
        }else{
            const newMembership= new Membership({price,months,gym:req.gym._id});
            await newMembership.save();
            res.status(200).json({
                message:"Added Successfully",
                data:newMembership
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}

exports.getmembership=async(req,res)=>{
    try{
        const loggedInId=req.gym._id;
        const memberShip=await Membership.find({gym:loggedInId});
        res.status(200).json({
            message:"Membership Fetched Successfully",
            membership:memberShip
        })
    }catch(err){
        res.status(500).json({
            error:"Server Error"
        })
    }
}


// change

// Delete Membership
exports.deleteMembership = async (req, res) => {
    try {
        const { id } = req.params; // membership id
        const membership = await Membership.findOne({ _id: id, gym: req.gym._id });

        if (!membership) {
            return res.status(404).json({ error: "No such membership found" });
        }

        await Membership.deleteOne({ _id: id });
        res.status(200).json({ message: "Membership deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};
