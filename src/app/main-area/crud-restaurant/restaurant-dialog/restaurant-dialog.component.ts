import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogDialogComponent } from '../../crud-blog/detail-dialog/blog-dialog.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { SanitizeHtmlPipe } from 'src/app/shared/pipe/html-sanitize.pipe';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-restaurant-dialog',
  templateUrl: './restaurant-dialog.component.html',
  styleUrls: ['./restaurant-dialog.component.scss']
})
export class RestaurantDialogComponent implements OnInit {
  detailForm: FormGroup; visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  arrImage: any;
  menuData: any;
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
    this.menuData = [
      {
        name: '',
        price: '',
        description: '',
        image: ''
      }
    ];

    this.arrImage = new FormControl([]);
    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      content: [''],
      address: [''],
      description: [''],
      gallery: this.arrImage,
      views: [''],
      menu: this.fb.array([]),
      phone: [''],
      price: [''],
      isPopular: [false],
      image: [''],
      keywords: [''],
      status: [false]
    });
  }

  get formData() { return this.detailForm.get('menu') as FormArray; }
  get getGallery() { return this.detailForm.get('gallery') as FormArray; }
  ngOnInit(): void {
    if (this.data.id) {
      this.categories = this.data.category.data;
      this.api.getData(this.data.id, 'restaurants').subscribe(res => {
        this.dataEdit = res;
        this.arrImage.value = res.data.gallery;
        res.data.menu.forEach(val => {
          const control = this.detailForm.get('menu') as FormArray;
          control.push(this.getMenuVal(val.name, val.description, val.price, val.image));
        });
        this.isEdit = true;
        this.detailForm.get('name').setValue(res.data.name);
        this.detailForm.get('content').setValue(this.sanitize.transform(res.data.content));
        this.detailForm.get('image').setValue(res.data.image);
        this.detailForm.get('description').setValue(res.data.description);
        this.detailForm.get('views').setValue(res.data.views);
        this.detailForm.get('address').setValue(res.data.address);
        this.detailForm.get('price').setValue(res.data.price);
        this.detailForm.get('phone').setValue(res.data.phone);
        this.detailForm.get('category').setValue(res.data.category._id);
        this.detailForm.get('keywords').setValue(res.data.keywords);
        this.detailForm.get('isPopular').setValue(res.data.isPopular);
        this.detailForm.get('status').setValue(res.data.status);
      });
    } else {
      this.categories = this.data;
      console.log(this.categories);
      this.getFormMenu();
    }
  }

  getFormMenu() {
    const control = this.detailForm.get('menu') as FormArray;
    this.menuData.forEach(res => {
      control.push(this.getMenuVal(res.name, res.description, res.price, res.image));
    });
  }

  getMenuVal(name, description, price, image) {
    return this.fb.group({
      name,
      description,
      price,
      image
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
      this.api.postData(this.detailForm.value, 'restaurants').subscribe((res) => { }, (err: any) => {
        this.noti.showError('Tạo restaurant thất bại', err);
        console.log(err);
      }, () => {
        this.noti.showSuccess('Tạo restaurant Thành công', '');
        this.dialogRef.close();
      });

    } else {
      console.log(this.detailForm.value);
      this.api.updateData(this.detailForm.value, this.data.id, 'restaurants').subscribe((res) => {
      }, (err) => {
        console.log(err);
        this.noti.showError('Sửa restaurant thất bại', err);
      }, () => {
        this.noti.showSuccess('Sửa restaurant Thành công', '');
        this.dialogRef.close();
      });

    }
  }
}
