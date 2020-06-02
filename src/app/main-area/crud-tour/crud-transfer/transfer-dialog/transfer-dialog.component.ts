import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogDialogComponent } from 'src/app/main-area/crud-blog/detail-dialog/blog-dialog.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/html-sanitize.pipe';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.scss']
})
export class TransferDialogComponent implements OnInit {
  detailForm: FormGroup; visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  arrImage: any;
  scheduleData: any;
  tbData: DataSourceService;
  categories: any[];
  isEdit = false;
  dataEdit: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'https://up.flickr.com/services/upload/',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private noti: NotificationService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BlogDialogComponent>,
    private sharedData: SharedDataService,
    private sanitize: SanitizeHtmlPipe,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder
  ) {
    this.scheduleData = [
      {
        locationStart: '',
        locationEnd: '',
        price: ''
      }
    ];

    this.arrImage = new FormControl([]);
    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      content: [''],
      description: [''],
      images: this.arrImage,
      chairNum: [''],
      locationStart: [''],
      timeStart: [''],
      schedule: this.fb.array([]),
      timePerTrip: [''],
      phone: [''],
      price: [''],
      locationEnd: [''],
      isPopular: [false],
      image: [''],
      keywords: [''],
      status: [false]
    });
  }

  get formData() { return this.detailForm.get('schedule') as FormArray; }
  get getImages() { return this.detailForm.get('images') as FormArray; }
  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'transfers').subscribe(res => {
        this.dataEdit = res;
        this.arrImage.value = res.data.images;
        res.data.schedule.forEach(val => {
          const control = this.detailForm.get('schedule') as FormArray;
          control.push(this.getScheduleVal(val.locationStart, val.locationEnd, val.price));
        });
        this.isEdit = true;
        this.detailForm.get('name').setValue(res.data.name);
        this.detailForm.get('content').setValue(this.sanitize.transform(res.data.content));
        this.detailForm.get('image').setValue(res.data.image);
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('locationStart').setValue(res.data.locationStart);
        this.detailForm.get('locationEnd').setValue(res.data.locationEnd);
        this.detailForm.get('timeStart').setValue(res.data.timeStart);
        this.detailForm.get('timePerTrip').setValue(res.data.timePerTrip);
        this.detailForm.get('chairNum').setValue(res.data.chairNum);
        this.detailForm.get('price').setValue(res.data.price);
        this.detailForm.get('phone').setValue(res.data.phone);
        this.detailForm.get('category').setValue(res.data.category._id);
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
      control.push(this.getScheduleVal(res.locationStart, res.locationEnd, res.price));
    });
  }

  getScheduleVal(locationStart, locationEnd, price) {
    return this.fb.group({
      locationStart,
      locationEnd,
      price,
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

  close() {
    this.dialogRef.close();
  }

  createOrUpdate(val?) {
    console.log(this.detailForm.value);

    if (!this.data.id) {
      this.api.postData(this.detailForm.value, 'transfers').subscribe((res) => { }, (err: any) => {
        this.noti.showError('Tạo transfer thất bại', err);
        console.log(err);
      }, () => {
        this.noti.showSuccess('Tạo transfer Thành công', '');
        this.dialogRef.close();
      });

    } else {
      console.log(this.detailForm.value);
      this.api.updateData(this.detailForm.value, this.data.id, 'transfers').subscribe((res) => {
      }, (err) => {
        console.log(err);
        this.noti.showError('Sửa transfer thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa transfer Thành công', '');
        this.dialogRef.close();
      });

    }
  }
}
