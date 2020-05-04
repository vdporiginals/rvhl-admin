import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TourDialogComponent } from '../../crud-tour/detail-dialog/tour-dialog.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-advertise-dialog',
  templateUrl: './advertise-dialog.component.html',
  styleUrls: ['./advertise-dialog.component.scss']
})
export class AdvertiseDialogComponent implements OnInit {
  detailForm: FormGroup;
  categories: any = [{ name: 'Banner Trang review', val: 'bannerReview' },
  { name: 'Banner Trang tour', val: 'bannerTour' },
  { name: 'Banner trang tàu vịnh', val: 'bannerCruise' },
  { name: 'back ground video', val: 'video' },
  { name: 'giới thiệu', val: 'about' },
  { name: 'Slider', val: 'slider' },
  { name: 'Khác', val: 'other' },
  { name: 'Vận chuỷen', val: 'bannerTransfer' },
  { name: 'khách sạn', val: 'bannerHotel' }];
  isEdit = false;
  dataEdit: any;
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      link: [''],
      description: [''],
      category: [''],
      status: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'blogs').subscribe(res => {
        this.dataEdit = res;
        console.log(this.dataEdit);
        this.isEdit = true;
      });
    } else {
      this.categories = this.data;
    }
  }

  createOrUpdate(val?) {
    console.log(this.detailForm.value);
    if (this.data.id) {
      this.api.updateData(this.detailForm.value, this.data.id, 'advertises').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo advertises thất bại', err.error.error);
      }, () => {
        this.noti.showSuccess('Tạo advertises Thành công', '');
      });
    } else {
      this.api.postData(this.detailForm.value, 'advertises').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo advertises thất bại', err.error.error);
      }, () => {
        this.noti.showSuccess('Tạo advertises Thành công', '');
      });
    }
  }
}
