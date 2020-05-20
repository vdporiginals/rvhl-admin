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
  pages: any = [{ name: 'Quảng cáo trang chủ', value: 'Homepage' },
  { name: 'Quảng cáo trang Tàu vịnh', value: 'TourCruisePage' },
  { name: 'Quảng cáo trang trọn gói', value: 'TourAllPage' },
  { name: 'Quảng cáo trang di chuyển', value: 'TransferPage' },
  { name: 'Quảng cáo trang tour hạ long', value: 'TourHalongPage' },
  { name: 'Quảng cáo trang Lịch trình', value: 'SchedulePage' },
  { name: 'Quảng cáo trang Ăn gì', value: 'FoodPage' },
  { name: 'Quảng cáo trang Khách sạn', value: 'HotelPage' },
  { name: 'Quảng cáo trang Homestay', value: 'HomestayPage' },
  { name: 'Quảng cáo trang Villa', value: 'VillaPage' }
  ];
  categories: any[];
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
      page: [''],
      keywords: [''],
      isPopular: [false],
      status: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'advertises').subscribe(res => {
        this.dataEdit = res;
        this.isEdit = true;
        this.detailForm.get('category').setValue(res.data.category.name);
        this.detailForm.get('title').setValue(res.data.title);
        this.detailForm.get('image').setValue(res.data.image);
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('page').setValue(res.data.page);
        this.detailForm.get('isPopular').setValue(res.data.isPopular);
        this.detailForm.get('status').setValue(res.data.status);
      });
    } else {
      this.categories = this.data;
    }
  }

  createOrUpdate(val?) {
    console.log(this.detailForm.value);
    if (this.data.id) {
      this.api.updateData(this.detailForm.value, this.data.id, 'advertises').subscribe(() => { }, (err: any) => {
        this.noti.showError('Sửa advertises thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa advertises Thành công', '');
        this.dialogRef.close();
      });
    } else {
      this.api.postData(this.detailForm.value, 'advertises').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo advertises thất bại', err);
      }, () => {
        this.noti.showSuccess('Tạo advertises Thành công', '');
        this.dialogRef.close();
      });
    }
  }
}
