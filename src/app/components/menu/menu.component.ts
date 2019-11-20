import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private _navController: NavController, private callNumber: CallNumber) { }

  ngOnInit() {
  }

  itemClick(page) {
    if(page == 'chamada'){
      this.callNumber.callNumber("188", true)
    } else{
    this._navController.navigateRoot("/" + page);

    document.getElementById("corpo").classList.toggle("open");
    document.getElementById("botao").classList.toggle("open-botao");
  }
  }
  
  open() {
    document.getElementById("corpo").classList.toggle("open");
    document.getElementById("botao").classList.toggle("open-botao");
  }

}
