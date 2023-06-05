import { Component,OnInit ,Input,SimpleChange,OnChanges,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import {TickOptions} from 'chart.js'
// import Chart from 'chart.js';
import { DataService } from 'src/app/service/data-service.service';
import { isNgTemplate } from '@angular/compiler';
import { Email } from 'src/app/model/email';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  
  // jsonData:Email[]=[];
  allJsonData:Email[]=[];
  public chart: any;
  constructor(private route: ActivatedRoute,private dataService:DataService) { }
  @Input() id!: number;
  // ngOnInit() {
  //   this.jsonData=this.dataService.getJsonById(this.id);
  //   console.log(Chart);
  //   this.createChart();
  //   this.chart.update();
  //   console.log("here")
  //   console.log(this.id)
  // }
  async ngOnInit(){
    await this.getData();
    console.log(this.allJsonData)
    this.createChart();
  }
  // ngOnChanges(changes:{ [propName: string]: SimpleChange }) {
  //   if (changes['id'] && !changes['id'].firstChange) {
  //     // this.jsonData = this.dataService.getJsonById(this.id);
  //     // this.allJsonData=this.dataService.getJsonData();
  //     // console.log(this.allJsonData)

  //     console.log(this.allJsonData.map((item:any)=>item.date))
  //     // this.createChart();
  //     this.updateChart();
      
  //   }
  // }
  // ngAfterViewInit() {
    // console.log(this.jsonData)
    // this.getData();
    // console.log(this.allJsonData)
    // this.createChart();
    
  // }

  async getData() {
    try {
      this.allJsonData= await this.dataService.setJsonData();
      // Handle the data here
      // console.log(this.allJsonData);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  }
  updateChart() {
    if (this.chart) {

      // this.createChart();
      this.chart.data.labels = this.allJsonData.map((item: any) => item.date),
      console.log(this.chart.data.labels)
      Object.keys(this.allJsonData[0].data).map((key: string) => ({
        label: key,
        data: this.allJsonData.map((item: any) => item.email[key]),
      })),
      // this.chart.data.datasets[0].
      // this.chart.data.datasets[0].data = this.allJsonData.map((item: any) => item.email[key]);
      this.chart.update();
    }
  }
  

  createChart(){
    this.chart=new Chart('myChart',{
      type:'line',
      data: {
        labels: this.allJsonData.map((item: any) => item.date),
        datasets: Object.keys(this.allJsonData[0].data).map((key: string) => ({
          label: key,
          data: this.allJsonData.map((item: any) => item.data[key]),
        })),
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            // ticks: {
              beginAtZero: true,
              max: 110 // Set the maximum value of the y-axis to 100
            // }
          }
        }
      }
    });
    // console.log(this.jsonData.date)
  }
}
