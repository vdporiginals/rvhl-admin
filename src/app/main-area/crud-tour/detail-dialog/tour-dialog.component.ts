import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

import { MatChipInputEvent } from '@angular/material/chips';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/html-sanitize.pipe';

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
  categories: any[];
  isEdit = false;
  dataEdit: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  positions = [{
    name: 'Tàu vịnh',
    val: 'TourCruise'
  }, {
    name: 'Trọn gói',
    val: 'TourAll'
  }, {
    name: 'Tour Hạ Long',
    val: 'TourHaLong'
  }];
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
    private dialogRef: MatDialogRef<TourDialogComponent>,
    private sharedData: SharedDataService,
    private sanitize: SanitizeHtmlPipe,
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
      content: [''],
      price: ['', Validators.compose([Validators.required])],
      address: [''],
      category: [''],
      position: [''],
      keywords: [''],
      isPopular: [false],
      status: [false, Validators.required]
    });
  }

  get formData() { return this.detailForm.get('schedule') as FormArray; }
  get getImages() { return this.detailForm.get('images') as FormArray; }
  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'tours').subscribe(res => {
        this.dataEdit = res;
        res.data.schedule.forEach(val => {
          const control = this.detailForm.get('schedule') as FormArray;
          control.push(this.getScheduleVal(val.timeStart, val.timeEnd, val.location, val.service));
        });
        this.arrImage.value = res.data.images;
        this.isEdit = true;
        this.detailForm.get('title').setValue(res.data.title);
        this.detailForm.get('price').setValue(res.data.price);
        this.detailForm.get('phone').setValue(res.data.phone);
        this.detailForm.get('content').setValue(this.sanitize.transform(res.data.content));
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('address').setValue(res.data.address);
        this.detailForm.get('customerNum').setValue(res.data.customerNum);
        this.detailForm.get('time').setValue(res.data.time);
        this.detailForm.get('category').setValue(res.data.category);
        this.detailForm.get('position').setValue(res.data.position);
        this.detailForm.get('keywords').setValue(res.data.keywords);
        this.detailForm.get('isPopular').setValue(res.data.isPopular);
        this.detailForm.get('status').setValue(res.data.status);
      });
    } else {
      this.categories = this.data;
      this.getFormSchedule();
    }
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
    if (this.data.id) {
      this.api.updateData(this.detailForm.value, this.data.id, 'tours').subscribe(() => { }, (err: any) => {
        this.noti.showError('Sửa tour thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa tour Thành công', '');
        this.dialogRef.close();
      });
    } else {
      this.api.postData(this.detailForm.value, 'tours').subscribe(() => { }, (err: any) => {
        this.noti.showError('Tạo tour thất bại', err.error);
      }, () => {
        this.noti.showSuccess('Tạo tour Thành công', '');
        this.dialogRef.close();
      });
    }
  }

}
