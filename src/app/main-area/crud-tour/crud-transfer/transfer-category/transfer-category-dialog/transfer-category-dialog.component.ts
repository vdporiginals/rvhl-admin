import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-transfer-category-dialog',
  templateUrl: './transfer-category-dialog.component.html',
  styleUrls: ['./transfer-category-dialog.component.scss']
})
export class TransferCategoryDialogComponent implements OnInit {
  detailForm: FormGroup;
  positions: any[] = [];
  isEdit = false;
  dataEdit: any;
  apiPath = 'transfers/category';
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TransferCategoryDialogComponent>,
    private sharedData: SharedDataService,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      keywords: ['']
    });
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.dataEdit = this.data.data;
      this.isEdit = true;
      this.detailForm.get('name').setValue(this.dataEdit.name);
      this.detailForm.get('description').setValue(this.dataEdit.description);
      this.detailForm.get('keywords').setValue(this.dataEdit.keywords);
    } else {
      this.isEdit = false;
    }
  }

  createOrUpdate(val?) {
    if (this.data !== null) {
      this.api.updateData(this.detailForm.value, this.dataEdit._id, this.apiPath).subscribe(() => { }, (err: any) => {
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
