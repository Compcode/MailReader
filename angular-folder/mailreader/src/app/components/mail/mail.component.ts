
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap ,Router} from '@angular/router';
import { Email } from 'src/app/model/email';
import { DataService } from 'src/app/service/data-service.service';
import {catchError} from 'rxjs/operators'; 
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent  implements OnInit{
  selectedView: string = 'tables'; 
  // id!:number;
  jsonData:Email[]=[];
  displayedColumns: string[] = [];
  dataSource:any;
   selectedFile : File | null = null;
  constructor(private route: ActivatedRoute,private dataService: DataService, private router: Router, private http : HttpClient) { }
  
  ngOnInit() {

    this.getData()
     
   
  }
  async getData(){
    try{
      this.jsonData=await this.dataService.setJsonData();
      // console.log(this.jsonData)
    }
    catch(error){
      console.log(error)
    }
  }

  //file upload logic

  onFileChange(event: any) : void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:8080/api/v1/chartdata/save/file', uploadData).subscribe(
      response => {
        console.log(response);
        // Handle the response from the server
      },
      error => {
        console.log(error);
        // Handle the error
      }
    );
  }
  
  
}
