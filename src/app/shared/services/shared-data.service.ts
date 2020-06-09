import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private blogId: string;
  private storageName = 'BlogId';
  private categoryId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private imageLink: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signature: BehaviorSubject<string> = new BehaviorSubject<string>('');
  signatureParams = this.signature.asObservable();
  isLogged = this.isLoggedIn.asObservable();
  categoryIdd = this.categoryId.asObservable();
  imageLinkPub = this.imageLink.asObservable();
  constructor() { }

  setCategoryId = (val: string) => {
    this.categoryId.next(val);
  }

  setLogged = (val: boolean) => {
    this.isLoggedIn.next(val);
  }
  setSignature = (val: string) => {
    this.signature.next(val);
  }
  setBlogId(value) {
    this.blogId = value;
  }

  getBlogId() {
    return this.blogId;
  }

  saveBlogId(data: any) {
    localStorage.setItem(this.storageName, this.blogId);
  }

  clearBlogId() {
    localStorage.removeItem(this.storageName);
  }

  setImageLink(val: string) {
    this.imageLink.next(val);
  }
}
