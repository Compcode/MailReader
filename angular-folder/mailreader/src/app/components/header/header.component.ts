import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  // uploadFiles() {
  //   const formData = new FormData();
  //   for (let file of this.selectedFiles) {
  //     formData.append('files', file);
  //   }

  //   this.http.post('http://localhost:8080/api/v1/chartdata/save/file', formData).subscribe(
  //     () => {
  //       console.log('Files uploaded successfully');
  //     },
  //     (error) => {
  //       console.error('Error uploading files:', error);
  //     }
  //   );
  // }
}
