
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap ,Router} from '@angular/router';
import { Email } from 'src/app/model/email';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent  implements OnInit{
  selectedView: string = 'tables'; 
  id!:number;
  jsonData:Email[]=[];
  displayedColumns: string[] = [];
  dataSource:any;
  constructor(private route: ActivatedRoute,private dataService: DataService, private router: Router, private http : HttpClient) { }
  
  selectedFile : File | null = null;

  ngOnInit() {
    this.getDataById()
      console.log(this.jsonData)
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.id = +params.get('id')!;
      // this.jsonData = this.dataService.getJsonById(this.id);
      
      // this.displayedColumns = Object.keys(this.jsonData.data);
      // console.log(this.displayedColumns);
      // this.dataSource = [this.jsonData.email];
      // console.log(this.dataSource);
    // });
    // this.navigateToChartComponent();
   
  }
  async getDataById(){
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


  // handleFileUpload(files: FileList| null) {
  
  //   if(files && files.length>0){
  //     const file = files.item(0); // Get the first selected file
  //     if (file) {
  //     console.log(file);
  //     }
      
  //   }else{
  //     console.log("here")
  //   }
  // }
}
