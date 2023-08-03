exports.sendtoken=(user,statuscode,res)=>{
    const token=user.getjwttoken();
    const options={
        expires:new Date(Date.now()+1*24*60*60*1000),
        httpOnly:true
    }
    res.status(statuscode).cookie("token",token,options);
    res.status(statuscode).json({
        success:true,
        token
    })
}