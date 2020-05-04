import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {
  detailForm: FormGroup; visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  arrImage: any;
  tbData: DataSourceService;
  categories: any[];
  categoryId: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public Editor = ClassicEditor;
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BlogDialogComponent>,
    private sharedData: SharedDataService,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.categoryId = new FormControl();
    this.arrImage = new FormControl([]);
    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      category: [''],
      content: [''],
      description: [''],
      images: this.arrImage,
      address: [''],
      status: [false, Validators.required]
    });
  }
  get getImages() { return this.detailForm.get('images') as FormArray; }
  ngOnInit(): void {
    if (this.data.category) {
      this.categories = this.data.category.data;
    } else {
      this.categories = this.data;
    }
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

  close() {
    this.dialogRef.close();
  }

  createOrUpdate(val?) {
    if (!this.data.val) {
      console.log(this.data);
      this.api.postData(this.detailForm.value, 'blogs').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo tour thất bại', err.error);
      }, () => {
        this.noti.showSuccess('Tạo tour Thành công', '');
      });

    } else {
      this.api.updateData(this.detailForm.value, this.data.val._id, 'blogs').subscribe(() => {
      }, (err: any) => {
        this.noti.showError('Tạo tour thất bại', err.error);
      }, () => {
        this.noti.showSuccess('Tạo tour Thành công', '');
      });

    }
  }
}
