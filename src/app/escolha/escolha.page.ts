import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-escolha',
  templateUrl: './escolha.page.html',
  styleUrls: ['./escolha.page.scss'],
})
export class EscolhaPage implements OnInit {

  constructor(private _navController: NavController) { }

  ngOnInit() {
  }

  escolha(conta) {
    document.querySelector("#tipo").setAttribute("hidden", "true");
    if(conta == 'usuario'){
       this._navController.navigateRoot('/cadastro');

    }
    if(conta == 'profissional'){
      this._navController.navigateRoot('/profissional');
      
    }
  }

}
