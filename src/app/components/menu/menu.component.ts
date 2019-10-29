import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  open() {
    document.getElementById("corpo").classList.toggle("open");
    document.getElementById("botao").classList.toggle("open-botao");
    console.log("click");
    

  }

}
