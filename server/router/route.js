const express=require("express")
const router=express.Router()
const xlFile=require("../multer/xlsx")
const payslip=require("../controller/payslip/index")

let routes=(app)=>{
    router.post("/xlupload", xlFile.single("xlxs"),payslip.uploadXlFile)
    router.post("/getinfo",payslip.getData)
    //router.post("/getdetails",payslip.getemployeedetail)
    router.post("/getpayrolldetails",payslip.getpayroll)
    router.post("/getemployee",payslip.getemployee)
    router.get("/get",payslip.getting)

    app.use("/api",router)
}

module.exports=routes