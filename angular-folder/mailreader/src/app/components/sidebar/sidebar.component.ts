import { Component } from '@angular/core';
import { Email } from 'src/app/model/email';

import { DataService } from 'src/app/service/data-service.service';

// interface EmailData {  
//     id: Number;  
//     name: String;  
//     email: {
//       [key: string]: number;
//     };  
//     date: String;  
// }  
// const data = [
//   {
//     id: 1,
//     name: "email1",
//     email: {
//       sub1: 12,
//       sub2: 13,
//       sub3: 10,
//       sub4:67,
//     },
//     date: "31-05-2023",
//   },
//   {
//     id: 2,
//     name: "email2",
//     email: {
//       sub17: 12,
//       sub2: 13,
//       sub3: 10,
//       sub4: 29,
//     },
//     date: "29-05-2023",
//   },
// ];
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  // emailData: EmailData[] = data;
  emailData:Email[]=[];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    // this.dataService.setJsonData(data);
    this.getData()
    // this.emailData=this.dataService.setJsonData();
    // console.log(this.emailData)
    // console.log(this.emailData.__zone_symbol__value)
  }  
  async getData() {
    try {
      this.emailData= await this.dataService.setJsonData();
      // Handle the data here
      console.log(this.emailData);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  }
}
