import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayslipComponent } from './payslip/payslip.component';
import { PrintPageComponent } from './print-page/print-page.component';

const routes: Routes = [
  {path:"",component:PayslipComponent},
  {path:"print",component:PrintPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
