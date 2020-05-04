import { Component, OnInit } from '@angular/core';
import { SideBar } from './side-bar';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  navItems = SideBar;
  constructor() { }

  ngOnInit(): void {
  }

}
