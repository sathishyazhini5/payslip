export class getset{
    static id: string
    static payslip:any
    static data(value: string){
      console.log(value);
      
          this.id=value
          console.log(this.id);
          
      }
     static rowdata(){
        console.log(this.id);
        
          return this.id
      }
      static setPayslip(data:any){
        console.log(data);
        
        this.payslip=data
        console.log(this.payslip);
        
      }
      static getPayslip(){
        return  this.payslip
      }
}