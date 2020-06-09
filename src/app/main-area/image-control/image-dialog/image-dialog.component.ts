import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ImageControlService } from 'src/app/shared/services/image-control.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;
  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 9;
  isLastPage = false;
  isFirstPage = false;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;


  currentPageImage: number;
  countImage: number;
  isLastPageImage = false;
  isFirstPageImage = false;

  galleries: any;
  isOpen = true;
  folderGalleryOpen = false;
  folderIndex: any = 'default';
  imageList: any;
  constructor(private dialogRef: MatDialogRef<ImageDialogComponent>, private sharedData: SharedDataService, private api: ImageControlService) { }

  ngOnInit(): void {
    // this.dialogRef.close();
    this.getGalleries(1);
    this.getPhotosDefault(1);
  }

  getPhotosDefault(page) {
    this.api.getDatas('image/photos', page, 9, null, 'm').subscribe((res: any) => {
      this.imageList = res.data.imageList;
      this.countImage = res.count;
      if (page === res.totalPages) {
        this.isLastPageImage = true;
        this.currentPageImage = res.totalPages;
      } else {
        this.isLastPageImage = true;
        this.currentPageImage = page;
      }

      if (page === 1) {
        this.isFirstPageImage = true;
      } else {
        this.isFirstPageImage = false;
      }
    });
  }

  getGalleries(page) {
    this.api.getDatas('image/gallery', page, 9).subscribe((res: any) => {
      this.galleries = res.data.galleryList;
      this.count = res.data.count;
      // console.log(res);
      if (page === res.data.totalPages) {
        this.isLastPage = true;
        this.currentPage = res.data.totalPages;
      } else {
        this.isLastPage = true;
        this.currentPage = page;
      }

      if (page === 1) {
        this.isFirstPage = true;
      } else {
        this.isFirstPage = false;
      }
    });
  }

  chooseImage(id, size?) {
    this.api.getData(id, 'image/photos', null, null, null, size).subscribe((res: any) => {
      this.sharedData.setImageLink(res.data.link);
    });
  }

  openFolder(folderIndex?) {
    console.log(folderIndex)
    if (folderIndex !== undefined) {
      this.folderIndex = folderIndex;
      this.isOpen = false;
      this.folderGalleryOpen = true;
    } else {
      // this.isOpen = true;
      this.isOpen = true;
      this.folderGalleryOpen = false;
      this.folderIndex = 'default';
    }

    // if (this.isOpen === true) {
    //   this.isOpen = false;
    // } else {
    //   this.isOpen = true;
    // }
  }
}
