import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _navController: NavController) { }

  ngOnInit() {
    document.querySelector("app-menu").setAttribute("hidden", "true");
  }

  home() {
    this._navController.navigateRoot("/home");
  }

  cadastro() {
    this._navController.navigateRoot("/cadastro");
  }

}
