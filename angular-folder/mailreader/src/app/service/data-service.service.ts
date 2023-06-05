import { Injectable } from '@angular/core';
import data from './data.json';
import { HttpClient } from '@angular/common/http';
import {Email} from 'src/app/model/email';
import {catchError} from 'rxjs/operators'; 
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private jsonData: any;

  //json data assets/data.json
  setJsonData() : Promise<Email[]>{
    return new Promise<Email[]>((resolve,reject)=>{
      this.http.get<Email[]>('http://localhost:8080/api/v1/chartdata/').pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong.');
        })
      ).subscribe((data: Email[]) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
      // this.jsonData = data;
  
  }

  getJsonData() {
    
    return this.jsonData;
  }
  async getJsonById(id:number){
    const jsonData=await this.setJsonData();
    return jsonData.find((data:any)=>data.id===id)
  }

}
