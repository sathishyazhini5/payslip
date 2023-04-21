import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayslipServerService {

  endPoint="http://localhost:5500/api/"

  constructor(private httpClient:HttpClient) { }

  getEmpDetail(){
    return this.httpClient.get(this.endPoint+"get")
  }

  getPayslipDetail(data:any){
    return this.httpClient.post(this.endPoint+"getinfo",data)
  }
}
