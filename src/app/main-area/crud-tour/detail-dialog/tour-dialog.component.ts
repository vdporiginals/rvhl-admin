import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { Schedule } from './schedule';

@Component({
  selector: 'app-tour-dialog',
  templateUrl: './tour-dialog.component.html',
  styleUrls: ['./tour-dialog.component.scss']
})
export class TourDialogComponent implements OnInit {
  detailForm: FormGroup;
  scheduleData: any;
  isOverFlow = false;
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    public fb: FormBuilder) {
    this.scheduleData = [
      {
        timeStart: '',
        timeEnd: '',
        location: '',
        service: ''
      }
    ];

    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(20)])],
      customerNum: [''],
      description: [''],
      schedule: this.fb.array([]),
      time: [''],
      price: ['', Validators.compose([Validators.required])],
      address: ['']
    });
    this.getFormSchedule();
  }

  get formData() { return this.detailForm.get('schedule') as FormArray; }
  ngOnInit(): void {
  }
  getFormSchedule() {
    const control = this.detailForm.get('schedule') as FormArray;
    this.scheduleData.forEach(res => {
      control.push(this.getScheduleVal(res.timeStart, res.timeEnd, res.location, res.service));
    });
    this.detailForm.reset(this.detailForm.value);
  }

  getScheduleVal(tStart, tEnd, location, service) {
    return this.fb.group({
      timeStart: tStart,
      timeEnd: tEnd,
      location,
      service
    });
  }


  createOrUpdate(val?) {
    this.detailForm.value.schedule =
      this.api.postData(this.detailForm.value, 'tours').subscribe(() => { }, error => {
        this.noti.showError('Tạo tour thất bại', error.error.error);
      }, () => {
        this.noti.showSuccess('Tạo tour Thành công', '');
      });
  }

}
