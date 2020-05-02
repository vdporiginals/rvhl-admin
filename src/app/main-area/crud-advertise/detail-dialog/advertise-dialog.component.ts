import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TourDialogComponent } from '../../crud-tour/detail-dialog/tour-dialog.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-advertise-dialog',
  templateUrl: './advertise-dialog.component.html',
  styleUrls: ['./advertise-dialog.component.scss']
})
export class AdvertiseDialogComponent implements OnInit {
  detailForm: FormGroup;
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    public fb: FormBuilder, ) {
    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      schedule: [
        {
          timeStart: [''],
          timeEnd: [''],
          location: [''],
          service: ['']
        }
      ],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(20)])],
      customerNum: [''],
      description: [''],
      time: [''],
      price: ['', Validators.compose([Validators.required])],
      address: ['']
    });
  }

  ngOnInit(): void {
  }

  createOrUpdate(val) {
    this.api.postData(this.detailForm.value, 'tours').subscribe(() => { }, error => {
      this.noti.showError('Tạo tour thất bại', error.error.error);
    }, () => {
      this.noti.showSuccess('Tạo tour Thành công', '');
    });
  }
}
