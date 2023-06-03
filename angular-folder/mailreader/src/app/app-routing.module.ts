import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MailComponent } from './components/mail/mail.component';
import { ChartComponent } from './components/chart/chart.component';
import { TableComponent } from './components/table/table.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path:'',
    component:HomeComponent,
    children: [{
      path:'showchart/:id',
      component:MailComponent,
      children:[{
        path:'chart',
        component:ChartComponent,
        // data: {
        //   idFromMail: true
        // }
      },{
        path:'table',
        component:TableComponent,
       
      },
    ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  HomeComponent,MailComponent
]