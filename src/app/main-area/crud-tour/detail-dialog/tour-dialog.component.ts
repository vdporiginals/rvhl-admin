import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { Schedule } from './schedule';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-tour-dialog',
  templateUrl: './tour-dialog.component.html',
  styleUrls: ['./tour-dialog.component.scss']
})
export class TourDialogComponent implements OnInit {
  detailForm: FormGroup;
  scheduleData: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  arrImage: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.scheduleData = [
      {
        timeStart: '',
        timeEnd: '',
        location: '',
        service: ''
      }
    ];

    this.arrImage = new FormControl([]);

    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(20)])],
      customerNum: [''],
      description: [''],
      images: this.arrImage,
      schedule: this.fb.array([]),
      time: [''],
      price: ['', Validators.compose([Validators.required])],
      address: ['']
    });
    this.getFormSchedule();
  }

  get formData() { return this.detailForm.get('schedule') as FormArray; }
  get getImages() { return this.detailForm.get('images') as FormArray; }

  ngOnInit(): void {
  }

  getFormSchedule() {
    const control = this.detailForm.get('schedule') as FormArray;
    this.scheduleData.forEach(res => {
      control.push(this.getScheduleVal(res.timeStart, res.timeEnd, res.location, res.service));
    });
  }

  getScheduleVal(tStart, tEnd, location, service) {
    return this.fb.group({
      timeStart: tStart,
      timeEnd: tEnd,
      location,
      service
    });
  }

  addImg(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.arrImage.setValue([...this.arrImage.value, value.trim()]);
      this.arrImage.updateValueAndValidity();
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeImg(val: string): void {
    const index = this.arrImage.value.indexOf(val);

    if (index >= 0) {
      this.arrImage.value.splice(index, 1);
      this.arrImage.updateValueAndValidity();
    }
  }

  createOrUpdate(val?) {
    console.log(this.detailForm.value);
    if (this.data) {
      this.api.updateData(this.detailForm.value, this.data._id, 'tours').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo tour thất bại', err.error.error);
      }, () => {
        this.noti.showSuccess('Tạo tour Thành công', '');
      });
    } else {
      this.api.postData(this.detailForm.value, 'tours').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo tour thất bại', err.error.error);
      }, () => {
        this.noti.showSuccess('Tạo tour Thành công', '');
      });
    }
  }

}
