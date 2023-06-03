
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
  constructor(private route: ActivatedRoute,private dataService: DataService, private router: Router) { }
  
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
