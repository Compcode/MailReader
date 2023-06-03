import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from 'src/app/model/email';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  allJsonData:Email[]=[];
  dataSource:any;
  displayedColumns: string[] = [];

  public chart: any;
  constructor(private route: ActivatedRoute,private dataService:DataService) { }

  async ngOnInit() {
    await this.getData();
    // this.displayedColumns=[...Object.keys(this.allJsonData.data)];
    this.dataSource=this.allJsonData;
    this.displayedColumns=Object.keys(this.allJsonData[0].data)
    console.log(this.dataSource);
    console.log(this.displayedColumns)
  }

  async getData(){
    try{
      this.allJsonData=await this.dataService.setJsonData();
    }
    catch(error){
      console.error(error);
    }
  }
}
