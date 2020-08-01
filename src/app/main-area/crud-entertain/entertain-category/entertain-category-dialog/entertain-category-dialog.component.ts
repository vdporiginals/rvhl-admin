import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-entertain-category-dialog',
  templateUrl: './entertain-category-dialog.component.html',
  styleUrls: ['./entertain-category-dialog.component.scss']
})
export class EntertainCategoryDialogComponent implements OnInit {
  detailForm: FormGroup;
  positions: any = [];
  isEdit = false;
  dataEdit: any;
  apiPath = 'entertains/category';
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EntertainCategoryDialogComponent>,
    private sharedData: SharedDataService,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      keywords: ['']
    });
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.api.getData(this.data.id, this.apiPath).subscribe(res => {
        this.dataEdit = res;
        this.isEdit = true;
      });
    } else { }
  }

  createOrUpdate(val?) {
    console.log(this.detailForm.value);
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