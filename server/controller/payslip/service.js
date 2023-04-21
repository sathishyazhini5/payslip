const mongoose = require("mongoose")
const empDetailsSchema = mongoose.Schema({
    Company_Name: String,
    Employee_id: String,
    Employee_Name: String,
    Gender: String,
    Date_of_Joining: String,
    Location: String,
    Mobile_Number :{ type: String, unique: true },
});

const empDetailsModel = mongoose.model("empdetails", empDetailsSchema);


const payrollDetailsSchema = mongoose.Schema({
    Employee_id: String,
    Salary: String,
    Basic: String,
    HRA: String,
    Conveyance: String,
    Other_allowance: String,
    LOP: String,
    Month: String,
    Year: String,
    Designation: String,
    PAN: String,
    Bank_AC_Number: String,
    Total_Detuctions:String
});

const payrollDetailsModel = mongoose.model("payrolldetails", payrollDetailsSchema);

const saveEmpDetails = async (data) => {
    console.log(data);
    if (data.length !== 0) {
        const existingEmp = await empDetailsModel.findOne({ Mobile_Number: data.Mobile_Number });
        if (existingEmp) {
            
            return false;
        } else {
            const empDetails = new empDetailsModel(data);
            const savedEmpDetails = await empDetails.save();
            return savedEmpDetails;
        }
    } else {
        return false;
    }
};

const savePayrollDetails = async (data) => {
    console.log(data);
    if (data.length != 0) {
        const { Employee_id, Salary, LOP, Month,Total_Detuctions, ...rest } = data;
        const salary = parseFloat(Salary);
        const lop = parseInt(LOP);
        const daysInMonth = new Date(new Date().getFullYear(), new Date(Date.parse(Month + " 1, 2022")).getMonth() + 1, 0).getDate(); // Get number of days in the month

        let totalDeduction = 0; 
        if (lop > 1) {
            const dailySalary = salary / daysInMonth;
            const salaryToDeduct = Math.min(lop - 1, daysInMonth - 1) * dailySalary; 
            totalDeduction = Math.round(salaryToDeduct); 
        }

        const calculatedSalary = (lop > 1) ? (salary - totalDeduction).toString() : Salary; 

        const payrollDetails = new payrollDetailsModel({
            Employee_id,
            Salary: Salary,
            Basic: calculatedSalary, 
            LOP: LOP.toString(),
            Month: Month.toString(),
            Total_Detuctions: (lop > 1) ? totalDeduction.toString() : '0', 
            ...rest
        });
        const savedPayrollDetails = await payrollDetails.save();
        return savedPayrollDetails;
    } else {
        return false;
    }
};







const getEmpDetailsById = async (employeeId) => {
    try {
        const empDetails = await empDetailsModel.findOne({ Employee_id: employeeId });
        return empDetails;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getPayrollDetails = async (employeeId, month, year) => {
    try {
        const payrollDetails = await payrollDetailsModel.find({ Employee_id: employeeId, Month: month, Year: year });
        return payrollDetails;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch payroll details");
    }
};


const updatePayslip=async(data)=>{

}

const retrivePayslip=async(data)=>{
    console.log(data);
    let getInfo
    if (data.emp_id!=undefined&&data.month!=undefined&&data.year!=undefined) {
        getInfo=await payrollDetailsModel.aggregate([
            {$match:{Employee_id:data.emp_id,Month:data.month,Year:data.year}},
            {
                $lookup: {
                    from: 'empdetails',
                    localField: 'Employee_id',
                    foreignField: 'Employee_id',
                    as: 'payroll'
                }
            },
            { $unwind: "$payroll" },
            {
                $project: {
                    "Company_Name":"$payroll.Company_Name",
                    "Employee_id":"$Employee_id",
                    "Employee_Name": "$payroll.Employee_Name",
                    // "DOB": "$DOB",
                    "Gender": "$payroll.Gender",
                    "Location":"$payroll.Location",
                    "Mobile_Number": "$payroll.Mobile_Number",
                    "Date_of_Joining": "$payroll.Date_of_Joining",
                    "Designation": "$Designation",
                    "Bank_AC_Number": "$Bank_AC_Number",
                    // "IFSC_code": "$IFSC_code",
                    "Basic": "$Basic",
                    "HRA": "$HRA",
                    "PAN": "$PAN",
                    "LOP":"$LOP",
                    "Conveyance": "$Conveyance",
                    "Other_allowance": "$Other_allowance",
                    "Salary": "$Salary",
                    "Total_Detuctions":"$Total_Detuctions",
                    "Month":"$Month",
                    "Year":"$Year"
                }
            }
           ])
    }
    else{
        getInfo=false
    }
     
   return getInfo
}
const getEmployeeName = async (employeeId, salary, month, year) => {
    try {
      // Find payroll details with matching criteria
      const payrollDetails = await payrollDetailsModel.findOne({
        Employee_id: employeeId,
        Salary: salary,
        Month: month,
        Year: year
      });
  
      // If payroll details found, get employee name from empDetailsModel
      if (payrollDetails) {
        const employeeDetails = await empDetailsModel.findOne({
          Employee_id: employeeId
        });
        return employeeDetails ? employeeDetails.Employee_Name : null;
      } else {
        return null; // Return null if no matching data found
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
const get=async(data)=>{
    const getdata=await empDetailsModel.find({})
    return getdata
}

const getWholedata=async(data)=>{
    // const getdata=await 
}
  

module.exports={
    saveEmpDetails,
    savePayrollDetails,
    updatePayslip,
    retrivePayslip,
    getEmpDetailsById,
    getPayrollDetails,
    getEmployeeName,
    get
}