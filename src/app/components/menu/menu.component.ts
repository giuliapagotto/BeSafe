import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private _navController: NavController) { }

  ngOnInit() {
  }

  logOut() {
    this._navController.navigateRoot("/login");

    document.getElementById("corpo").classList.toggle("open");
    document.getElementById("botao").classList.toggle("open-botao");
  }
  
  open() {
    document.getElementById("corpo").classList.toggle("open");
    document.getElementById("botao").classList.toggle("open-botao");
  }

}
