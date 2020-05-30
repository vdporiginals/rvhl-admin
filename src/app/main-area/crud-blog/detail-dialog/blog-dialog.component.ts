import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/html-sanitize.pipe';

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
    this.arrImage = new FormControl([]);
    this.detailForm = this.fb.group({
      title: ['', Validators.required],
      category: [''],
      content: [''],
      description: [''],
      images: this.arrImage,
      address: [''],
      isPopular: [false],
      image: [''],
      keywords: [''],
      status: [false]
    });
  }
  get getImages() { return this.detailForm.get('images') as FormArray; }
  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'blogs').subscribe(res => {
        this.dataEdit = res;
        this.arrImage.value = res.data.images;
        this.isEdit = true;
        this.detailForm.get('title').setValue(res.data.title);
        this.detailForm.get('content').setValue(this.sanitize.transform(res.data.content));
        this.detailForm.get('image').setValue(res.data.image);
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('address').setValue(res.data.address);
        this.detailForm.get('category').setValue(res.data.category._id);
        this.detailForm.get('keywords').setValue(res.data.keywords);
        this.detailForm.get('isPopular').setValue(res.data.isPopular);
        this.detailForm.get('status').setValue(res.data.status);
      });
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
    console.log(this.data.id);
    if (!this.data.id) {
      this.api.postData(this.detailForm.value, 'blogs').subscribe((res) => { }, (err: any) => {
        this.noti.showError('Tạo reviews thất bại', err);
        console.log(err);
      }, () => {
        this.noti.showSuccess('Tạo reviews Thành công', '');
        this.dialogRef.close();
      });

    } else {
      console.log(this.detailForm.value);
      this.api.updateData(this.detailForm.value, this.data.id, 'blogs').subscribe((res) => {
      }, (err) => {
        console.log(err);
        this.noti.showError('Sửa reviews thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa reviews Thành công', '');
        this.dialogRef.close();
      });

    }
  }
}
