import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TourDialogComponent } from '../../crud-tour/detail-dialog/tour-dialog.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {
  detailForm: FormGroup;
  public Editor = ClassicEditor;
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    public fb: FormBuilder) {

    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(20)])],
      customerNum: [''],
      content: [''],
      description: [''],
      time: [''],
      price: ['', Validators.compose([Validators.required])],
      address: ['']
    });
  }

  ngOnInit(): void {
  }

  createOrUpdate(val?) {
    console.log(this.detailForm.value)
    this.api.postData(this.detailForm.value, 'blogs').subscribe(() => { }, error => {
      this.noti.showError('Tạo tour thất bại', error.error.error);
    }, () => {
      this.noti.showSuccess('Tạo tour Thành công', '');
    });
  }
}
