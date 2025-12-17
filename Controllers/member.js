const Member = require("../Modals/member");
const Membership=require('../Modals/membership');

exports.getAllMembers=async(req,res)=>{
    try{
        const {skip,limit}=req.query;
        const members  = await Member.find({gym:req.gym._id});
        const totalMember = members.length;

        const limitedmembers = await Member.find({gym:req.gym._id}).sort({createdAt: -1}).skip(skip).limit(limit);
        res.status(200).json({
            message:members.length?"Fetched Members SuccessFully":"No Any Member Registered Yet",
            members:limitedmembers,
            totalMembers:totalMember
        })

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server Error'});
    }
}

function addMonthsToDate(months,joiningDate){
    //Get current year, month, and day
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    //calculate the new month and year
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth/12);

    //calculate the correct future month 
    const adjustedMonth = futureMonth % 12;

    //set the date to the first of the future month
    const futureDate = new Date(futureYear,adjustedMonth,currentDay);

    //Get the last day of the future month
    const lastdayOfFutureMonth = new Date(futureYear,adjustedMonth+1,0).getDate();

    //adjust the day if current day exceeds the number of days in the new month
    const adjustedDay = Math.min(currentDay,lastdayOfFutureMonth);

    //set the final adjusted day
    futureDate.setDate(adjustedDay);

    return futureDate;

}  

exports.registerMember=async (req,res)=>{
    try{
        const {name,mobileNo,address,membership,profilePic,joiningDate}=req.body;
        const member=await Member.findOne({gym:req.gym._id,mobileNo})
        if(member){
            return res.status(400).json({error:'Already Registered With This Mobile No'});
        }
        const memberShip=await Membership.findOne({_id:membership,gym:req.gym._id});
        const membershipMonth = memberShip.months;
        if(memberShip){
            let jngDate=new Date(joiningDate);
            const nextBilldate= addMonthsToDate(membershipMonth,jngDate);
            let newmember = new Member({name,mobileNo,address,membership,gym:req.gym._id,profilePic,nextBilldate});
            await newmember.save();
            res.status(200).json({message:"Member Registered Successfully",newmember});
        }else{
            return res.status(409).json({error:"No such Membership are there"})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server Error'});
    }
}


exports.searchMember = async(req,res)=>{
    try{
        const {searchTerm} =req.query;
        const member=await Member.find({gym:req.gym._id,
            $or:[{name:{$regex : '^' + searchTerm, $options:'i'}},{mobileNo:{$regex : '^' + searchTerm, $options:'i'}}]
        });
        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member Register Yet",
            members:member,
            totalMembers:member.length
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}

exports.monthylMember = async (req,res)=>{
    try{
        const now = new Date();

        //get the first day of the current month
        const startOfMonth=new Date(now.getFullYear(),now.getMonth(),1);

        //get the last day of the current month
        const endOfMonth = new Date(now.getFullYear(),now.getMonth()+1,0,23,59,59,999);
        const member = await Member.find({gym:req.gym._id,
            createdAt: {
                $gte :startOfMonth,          //greater than or wequal to the first day of the month
                $lte :endOfMonth             //less than or equal to the last day of the month
            }
        }).sort({createdAt:-1});
        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member Registered Yet",
            members:member,
            totalMembers:member.length
        })

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Server Error'});
    }
}


exports.expiringWithin3Days=async (req,res)=>{
    try{
        const today = new Date();
        const nextThreeDays=new Date();
        nextThreeDays.setDate(today.getDate()+3);

        const member = await Member.find({gym:req.gym._id,
            nextBilldate:{
                $gte: today,
                $lte:nextThreeDays
            }
        });
        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member Is Expiring Within 3 Days",
            members:member,
            totalMembers:member.length
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}

exports.expiringWithin4To7Days=async (req,res)=>{
    try{
        const today=new Date();
        const next4Days=new Date();
        next4Days.setDate(today.getDate()+4);

        const next7Days=new Date();
        next7Days.setDate(today.getDate()+7);
        const member = await Member.find({gym:req.gym._id,
            nextBilldate:{
                $gte: next4Days,
                $lte: next7Days
            }
        });
        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member Is Expiring Within 4-7 Days",
            members:member,
            totalMembers:member.length
        })

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}

exports.expiredMember = async(req,res)=>{
    try{
        const today= new Date();
        const member=await Member.find({gym:req.gym._id,status:"Active",
            nextBilldate:{
                $lt: today
            }
        })
        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member has been Expired",
            members:member,
            totalMembers:member.length
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}


exports.inActiveMember=async(req,res)=>{
    try{
        const member=await Member.find({gym:req.gym._id,status:"Pending"});
        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member Is Pending",
            members:member,
            totalMembers:member.length
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}

exports.getMemberDeatils=async(req,res)=>{
    try{
        const {id}=req.params;
        const member = await Member.findOne({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No Such Member"
            })
        }   
        res.status(200).json({
            message:"Member Data Fetched",
            member:member
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server Error'})
    }
    
}


exports.changeStatus=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;
        const member = await Member.findOne({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No Such Member"
            })
        }  
        member.status=status;
        await member.save();
        res.status(200).json({
            message:"Status Changed Successfully"
        })

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Server Error'});
    }
}


exports.updateMemberPlan=async(req,res)=>{
    try{
        const {membership}=req.body;
        const {id}=req.params;
        const memberShip=await Membership.findOne({gym:req.gym._id,_id:membership})
        if(memberShip){
            let getMonth=memberShip.months;
            let today=new Date();
            let nextBilldate=addMonthsToDate(getMonth,today);
            const member=await Member.findOne({gym:req.gym._id,_id:id});
            if(!member){
                return res.status(409).json({error:"No Such Member Are There"});
            }
            member.nextBilldate=nextBilldate;
            member.lastPayment=today;
            await member.save();
            res.status(200).json({message:"Member Renewed Successfully",member})
        }else{
            return res.status(409).json({error:"No Such Membership Are There"})
        }


    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}


//change

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const member = await Member.findByIdAndUpdate(req.params.id, { paymentStatus }, { new: true });
        res.status(200).json({ message: "Payment status updated", member });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};
