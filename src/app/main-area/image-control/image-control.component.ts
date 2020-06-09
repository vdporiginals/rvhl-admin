import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/shared/services/flickr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.scss']
})
export class ImageControlComponent implements OnInit {
  flickrConf: any;
  constructor(private flickr: FlickrService, private dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // this.checkFlickr();
    this.dialog.open(ImageDialogComponent);
  }

  checkFlickr() {
    // window.open(`localhost:5001/api/image/auth`);
    // this.http.get(`${environment.apiUrl}/image/auth`).subscribe((res: any) => {
    //   console.log(res);
    //   // window.open(res.data, '_blank', 'width=500,height=600');
    // });

    this.route.queryParams.subscribe(res => {
      // console.log(res.oauth_token);
      if (res.oauth_token !== undefined) {
        // this.flickrConf = JSON.stringify(this.route.queryParams);
        console.log(res);

      } else {
        this.flickr.LoginFlickr();
      }
    });
  }
}
