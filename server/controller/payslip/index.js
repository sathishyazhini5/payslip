const service=require("./service")
const xlsx=require("xlsx")

const uploadXlFile = async (req, res) => {
    try {
        if (req.file == undefined) {
            res.send({ code: 400, Message: "Please upload file..!" });
        }
        let path = "./files/" + req.file.filename;

        const workbook = xlsx.readFile(path);
        const worksheet = workbook.Sheets['Employeedetails'];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (let item of data) {
            
            const empDetailsData = {
                Company_Name: item.Company_Name,
                Employee_id: item.Employee_id,
                Employee_Name: item.Employee_Name,
                Gender: item.Gender,
                Date_of_Joining: item.Date_of_Joining,
                Location: item.Location,
                Mobile_Number: item.Mobile_Number
            };

            const payrollDetailsData = {
                Employee_id: item.Employee_id,
                Salary: item.Salary,
                Basic: item.Basic,
                HRA: item.HRA,
                Conveyance: item.Conveyance,
                Other_allowance: item.Other_allowance,
                LOP: item.LOP,
                Month: item.Month,
                Year: item.Year,
                Designation: item.Designation,
                PAN: item.PAN,
                Bank_AC_Number: item.Bank_AC_Number,
                Total_Detuctions:item.Total_Detuctions
            };

            await service.saveEmpDetails(empDetailsData);
            await service.savePayrollDetails(payrollDetailsData);
        }
        res.send({ code: 200, Message: "File uploaded successfully..!" });
    } catch (error) {
        res.send({ code: 400, Message: "Something went wrong" });
    }
};

const getemployeedetail = async (req, res) => {
    try {
        const employeeId = req.body.Employee_id; 
        const empDetails = await service.getEmpDetailsById(employeeId);
        console.log(empDetails)
        if (empDetails) {
            res.send({ code: 200, data: empDetails });
        } else {
            res.send({ code: 404, Message: "Employee not found" });
        }
    } catch (error) {
        console.error(error);
        res.send({ code: 400, Message: "Something went wrong" });
    }
}

const getpayroll =  async (req, res) => {
    try {
        const employeeId = req.body.Employee_id;
        const month = req.body.Month;
        const year = req.body.Year;

        const payrollDetails = await service.getPayrollDetails(employeeId, month, year);
        res.send({ code: 200, Message: "Payroll details fetched successfully", data: payrollDetails });
    } catch (error) {
        console.error(error);
        res.send({ code: 400, Message: "Failed to fetch payroll details" });
    }
}




const retriveDetail=async(req,res)=>{
    const data=await service.retrivePayslip(req.query)
    res.send({code:200,Message:"success",result:data})
    console.log(data);
}

const getData = async (req, res) => {
    let uniqueData = [...new Set(req.body)];
    let results = [];
    for (let data of uniqueData) {
      let request = {
        emp_id: data.Employee_id,
        month: data.Month,
        year: data.Year,
      };
      let result = await service.retrivePayslip(request);
      results.push(result);
    }
    console.log(results);
    res.send({ Result: results });
  };
  
  

const getemployee =  async (req, res) => {
    try {
      const employeeId = req.body.employeeId;
      const salary = req.body.salary;
      const month = req.body.month;
      const year = req.body.year;
  
      // Call the service function to get employee name
      const employeeName = await service.getEmployeeName(employeeId, salary, month, year);
  
      if (employeeName) {
        res.send({ code: 200, data: { employeeName } });
      } else {
        res.send({ code: 404, Message: "Employee not found" });
      }
    } catch (error) {
      console.error(error);
      res.send({ code: 400, Message: "Something went wrong" });
    }
  }

  
  
const getting=async(req,res)=>{
    const get=await service.get(req.body)
    res.send(get)
}

  module.exports={
    uploadXlFile,
    retriveDetail,
    getData,
    getemployeedetail,
    getpayroll,
    getemployee,
    getting
    
}
