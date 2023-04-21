import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { PayslipServerService } from '../payslip-server.service';
import { Subject } from 'rxjs';
import{getset} from '../getset'
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';


const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PayslipComponent implements OnInit, OnDestroy, AfterViewInit  {
  @ViewChild('myTable') myTable1: any;
  fromDate = new FormControl(moment());
  toDate=new FormControl(moment());
  fromMonth: number | null = null;
  toMonth: number | null = null;
  startMonths: number[] = [];
endMonths: number[] = [];
startYears: number[] = [];
endYears: number[] = [];

  year: any;
  month: any;
  // public date: any;
  myId='Element'
  id: any;
  hide:boolean
  show:boolean
  datas: Object;
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
  arr:any=[]
  Conveyance: any;
  fromDated:any=[]
  toDated:any=[]
  Total_Detuctions: any;
  total: number;
  Month : any;
  Year : any=[]
  mon:any=[]
  data:any=[]
  
  
  
  ds:any;
  m2:any;

  displayedColumns: string[] = ['id', 'name', 'from','to', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private server:PayslipServerService, private router:Router) {
    this.id=getset.rowdata()
    console.log(getset.rowdata());
    this.hide=false
    this.show=true
   }

  ngOnInit(): void {
    this.getEmpData()
    console.log(this.toDate);
    // console.log(this.toDate.valu);
    
    
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.fromDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.fromDate.setValue(ctrlValue);
    this.fromMonth = normalizedMonthAndYear.month();
  
    // add start month and year to arrays
    this.startMonths.push(this.fromMonth);
    this.startYears.push(ctrlValue.year());
  
    datepicker.close();
  }
  
  setmonthAndyear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.toDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.toDate.setValue(ctrlValue);
    this.toMonth = normalizedMonthAndYear.month();
  
    // add end month and year to arrays
    this.endMonths.push(this.toMonth);
    this.endYears.push(ctrlValue.year());
  
    datepicker.close();
  }
  

  ngOnDestroy(): void {
    // dtTrigger.unsubscribe();
  }

  getEmpData(){
    this.server.getEmpDetail().subscribe((result:any)=>{
      console.log(result);
      
   this.dataSource = new MatTableDataSource(result);
  this.dataSource.paginator=this.paginator
  this.dataSource.sort=this.sort
  // dtTrigger.next();
    })
  }
  ngAfterViewInit() {
  }
  print(emp: any) {
    console.log(emp);
    this.fromDated.push(this.fromDate.value);
    var fromMon = this.fromDated[0]._d.getMonth();
    var fromYear = this.fromDated[0]._d.getFullYear();
  
    this.toDated.push(this.toDate.value);
    var toMon = this.toDated[0]._d.getMonth();
    var toYear = this.toDated[0]._d.getFullYear();
  
    if (this.fromMonth !== null && this.toMonth !== null) {
      var startYear = parseInt(fromYear);
      var endYear = parseInt(toYear);
  
      for (var i = startYear; i <= endYear; i++) {
        var endMonth = i != endYear ? 11 : parseInt(toMon);
        var startMon = i === startYear ? parseInt(fromMon) : 0;
  
        for (var j = startMon; j <= endMonth; j++) {
          var month = j + 1;
          const monthName = new Date(Date.UTC(i, j, 1)).toLocaleString('en-US', { month: 'long' });
          console.log(monthName);
  
          let employee_id = emp.Employee_id;
          let employee_name = emp.Employee_Name;
          let monthStr = month < 10 ? '0' + month : '' + month;
          let fileName = `${employee_name}_${monthStr}_${i}.pdf`;
  
          let data = [{
            Employee_id: employee_id,
            Month: monthName.toString(),
            Year: i.toString()
          }];
  
          setTimeout(() => {
            const elementsToPrint = document.getElementsByClassName('contentToPrint');
  for (let i = 0; i < elementsToPrint.length; i++) {
    const contentToPrint = elementsToPrint[i].innerHTML;
    const fileName = `${employee_name}_${monthStr}_${i}.pdf`;
    html2pdf().from(contentToPrint).save(fileName);}
            this.server.getPayslipDetail(data).subscribe((result) => {
              console.log(result);
              var obj = JSON.parse(JSON.stringify(result));
              console.log(obj.Result);
              this.detail = obj.Result;
  
              if (obj != null) {
                for (let k = 0; k < obj.Result.length; k++) {
                  this.detail = obj.Result[k];
                  console.log(this.detail);
  
                  if (this.detail.Company_Name != undefined) {
                    if (this.detail.Company_Name == "M2-Data Studio") {
                      this.month = this.detail.Month;
                      this.year = this.detail.Year;
                      this.m2 = true;
                    } else if (this.detail.Company_Name == "DIGERATI SOFTWARE DEVELOPMENT AND SERVICES LLP") {
                      this.month = this.detail.Month;
                      this.year = this.detail.Year;
                      this.ds = true;
                    }
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
                    this.Location=this.detail.Location
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
                  if (this.detail.Salary!=undefined) {
                    var slary=parseInt(this.Salary)
                    var detuction=parseInt(this.Total_Detuctions)
                    this.total=this.Salary-detuction
                  }
                }
              }
            });
          }, 100);
        }
      }
    }
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 
  

}
