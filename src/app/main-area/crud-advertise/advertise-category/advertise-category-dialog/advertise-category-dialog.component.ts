import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TourDialogComponent } from 'src/app/main-area/crud-tour/detail-dialog/tour-dialog.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-advertise-category-dialog',
  templateUrl: './advertise-category-dialog.component.html',
  styleUrls: ['./advertise-category-dialog.component.scss']
})
export class AdvertiseCategoryDialogComponent implements OnInit {
  detailForm: FormGroup;
  positions: any = [{ name: 'Quảng cáo silder', value: 'slider' },
  { name: 'Quảng cáo video', value: 'video' },
  { name: 'Quảng cáo cho homepage', value: 'HomepageAdvertise' },
  { name: 'Quảng cáo cho trang', value: 'AdvertisePage' }];
  isEdit = false;
  dataEdit: any;
  apiPath = 'advertises/category';
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      position: [''],
      keywords: [''],
      isPopular: [false],
      status: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      console.log(this.data)
      this.api.getData(this.data.id, this.apiPath).subscribe(res => {
        this.dataEdit = res;
        this.isEdit = true;
        this.detailForm.get('name').setValue(res.data.title);
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('position').setValue(res.data.page);
        this.detailForm.get('isPopular').setValue(res.data.isPopular);
        this.detailForm.get('status').setValue(res.data.status);
      });
    }

  }

  createOrUpdate(val?) {
    if (this.data !== null) {
      this.api.updateData(this.detailForm.value, this.data.id, this.apiPath).subscribe(() => { }, (err: any) => {
        this.noti.showError('Sửa category thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa category Thành công', '');
        this.dialogRef.close();
      });
    } else {
      this.api.postData(this.detailForm.value, this.apiPath).subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo category thất bại', err);
      }, () => {
        this.noti.showSuccess('Tạo category Thành công', '');
        this.dialogRef.close();
      });
    }
  }
}
