import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { Schedule } from './schedule';

@Component({
  selector: 'app-tour-dialog',
  templateUrl: './tour-dialog.component.html',
  styleUrls: ['./tour-dialog.component.scss']
})
export class TourDialogComponent implements OnInit {
  detailForm: FormGroup;
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    public fb: FormBuilder, ) {
    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      schedule: this.fb.group(new Schedule()),
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
  createOrUpdate(val?) {
    this.api.postData(this.detailForm.value, 'tours').subscribe(() => { }, error => {
      this.noti.showError('Tạo tour thất bại', error.error.error);
    }, () => {
      this.noti.showSuccess('Tạo tour Thành công', '');
    });
  }
}
