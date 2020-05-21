import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/html-sanitize.pipe';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataEdit } from '../../data-edit.interface';

@Component({
  selector: 'app-homestay-dialog',
  templateUrl: './homestay-dialog.component.html',
  styleUrls: ['./homestay-dialog.component.scss']
})
export class HomestayDialogComponent implements OnInit {
  detailForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  arrImage: any;
  categories: any[];
  isEdit = false;
  dataEdit: DataEdit;
  facilities: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    maxHeight: 'auto',
    width: 'auto',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Thêm nội dung cho reviews',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<HomestayDialogComponent>,
    private sharedData: SharedDataService,
    private sanitize: SanitizeHtmlPipe,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder) {
    this.arrImage = new FormControl([]);
    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(20)])],
      roomNum: [''],
      description: [''],
      images: this.arrImage,
      views: [''],
      content: [''],
      price: [''],
      address: [''],
      category: ['', Validators.required],
      facilities: new FormGroup({
        square: new FormControl(0),
        other: new FormControl(''),
        kitchen: new FormControl(false),
        oceanViews: new FormControl(false),
        pool: new FormControl(false),
      }),
      keywords: [''],
      isPopular: [false],
      status: [false]
    });
  }

  get getImages() { return this.detailForm.get('images') as FormArray; }
  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'estates/homestay').subscribe(res => {
        this.dataEdit = res;
        this.isEdit = true;
        this.facilities = res.data.facilities;

        this.arrImage.value = res.data.images;
        this.detailForm.get('name').setValue(res.data.name);
        this.detailForm.get('price').setValue(res.data.price);
        this.detailForm.get('phone').setValue(res.data.phone);
        this.detailForm.get('content').setValue(this.sanitize.transform(res.data.content));
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('address').setValue(res.data.address);
        this.detailForm.get('roomNum').setValue(res.data.roomNum);
        this.detailForm.get('views').setValue(res.data.views);
        this.detailForm.get('category').setValue(res.data.category);
        this.detailForm.get('keywords').setValue(res.data.keywords);
        this.detailForm.get('isPopular').setValue(res.data.isPopular);
        this.detailForm.get('status').setValue(res.data.status);

        this.detailForm.get('facilities.other').setValue(res.data.facilities.other);
        this.detailForm.get('facilities.pool').setValue(res.data.facilities.pool);
        this.detailForm.get('facilities.oceanViews').setValue(res.data.facilities.oceanViews);
        this.detailForm.get('facilities.kitchen').setValue(res.data.facilities.kitchen);
        this.detailForm.get('facilities.square').setValue(res.data.facilities.square);
      });
    } else {
      this.categories = this.data;
      console.log(this.categories)
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

  createOrUpdate(val?) {
    console.log(this.detailForm.value);
    if (this.data.id) {
      this.api.updateData(this.detailForm.value, this.data.id, 'estates/homestay').subscribe(() => { }, (err: any) => {
        this.noti.showError('Sửa homestay thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa homestay Thành công', '');
        this.dialogRef.close();
      });
    } else {
      this.api.postData(this.detailForm.value, 'estates/homestay').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo homestay thất bại', err.error);
      }, () => {
        this.noti.showSuccess('Tạo homestay Thành công', '');
        this.dialogRef.close();
      });
    }
  }

}
