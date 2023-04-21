import { Component, OnInit } from '@angular/core';
import{getset} from '../getset'

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {
  myId='element';
  payslip: any;
  detail: any;
  Employee_id: any;
  Employee_Name: any;
  Gender: any;
  PAN: any;
  Location: any;
  Designation: any;
  Date_of_Joining: any;
  Bank_AC_Number: any;
  LOP: any;
  Basic: any;
  HRA: any;
  Other_allowance: any;
  Salary: any;
  Conveyance: any;
  ds:boolean=false
  m2:boolean=false
  month: any;
  year: any;
  Total_Detuctions: any;
  total: number;
  
  constructor() { 

  }

  ngOnInit(): void {
   this.payslip= getset.getPayslip()
    // console.log(this.payslip);
    var obj=JSON.parse(JSON.stringify(this.payslip))
    // console.log(obj[0]);
    
    this.detail=obj[0]
    if (this.detail.Company_Name=="M2-Data Studio") {
      this.month=this.detail.Month
    this.year=this.detail.Year
      this.m2=true
    }
    else if(this.detail.Company_Name=="DIGERATI SOFTWARE DEVELOPMENT AND SERVICES LLP"){
      this.month=this.detail.Month
      this.year=this.detail.Year
      this.ds=true
    }
    if (this.detail.Employee_id!=undefined) {
      this.Employee_id=this.detail.Employee_id
    }
    if (this.detail.Employee_Name!=undefined ) {
      this.Employee_Name=this.detail.Employee_Name
    }
    if (this.detail.Gender!=undefined) {
      this.Gender=this.detail.Gender
    }
    if (this.detail.PAN!=undefined) {
      this.PAN=this.detail.PAN
    }
    if (this.detail.Location!=undefined) {
      Location=this.detail.Location
    }
    if (this.detail.Designation!=undefined) {
      this.Designation=this.detail.Designation
    }
    if (this.detail.Date_of_Joining!=undefined) {
      this.Date_of_Joining=this.detail.Date_of_Joining
    }
    if (this.detail.Bank_AC_Number!=undefined) {
      this.Bank_AC_Number=this.detail.Bank_AC_Number
    }
    if (this.detail.LOP!=undefined) {
      this.LOP=this.detail.LOP
    }
    if (this.detail.Basic!=undefined) {
      this.Basic=this.detail.Basic
    }
    if (this.detail.HRA!=undefined) {
      this.HRA=this.detail.HRA
    }
    if (this.detail.Conveyance!=undefined) {
      this.Conveyance=this.detail.Conveyance
    }
    if (this.detail.Other_allowance!=undefined) {
      this.Other_allowance=this.detail.Other_allowance
    }
    if (this.detail.Salary!=undefined) {
      this.Salary=this.detail.Salary
    }
    if (this.detail.Total_Detuctions!=undefined) {
      this.Total_Detuctions=this.detail.Total_Detuctions
    }

    var slary=parseInt(this.Salary)
    var detuction=parseInt(this.Total_Detuctions)
    this.total=this.Salary-detuction
  }
  print(){
    window.print()
  }
}
