import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('inputPost', { static: false }) myInput: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  resize() {
    this.myInput.nativeElement.style.height = "50px";
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }
}
