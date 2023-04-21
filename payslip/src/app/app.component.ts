import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'payslip';

  // @ViewChild('contentToPrint') contentToPrint: ElementRef;
  ngAfterViewInit() {
    // console.log(this.contentToPrint);
  }
  // printContent() {
  //   const content = this.contentToPrint.nativeElement.innerHTML;

  //   // hide the content
  //   this.contentToPrint.nativeElement.style.display = 'none';

  //   // print the content
  //   window.print();

  //   // show the content again
  //   this.contentToPrint.nativeElement.style.display = 'block';
  // }
}
