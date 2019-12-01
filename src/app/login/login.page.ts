import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formLogin: FormGroup
  public perfil;
  constructor(private _navController: NavController, private _http: HttpClient, private _formBuilder: FormBuilder, private _storage: Storage) {
    this.formLogin = this._formBuilder.group({
      login: new FormControl("", Validators.compose([Validators.required])),
      senha: new FormControl("", Validators.compose([Validators.required]))
    });
   }

  ngOnInit() {
    document.querySelector("app-menu").setAttribute("hidden", "true");
  }

  onSubmit() {

    let postData = new FormData;
    postData.append("login", this.formLogin.value);
   
    console.log(this.formLogin.value);

    this._http.post('http://localhost:3333/authenticate', this.formLogin.value).subscribe((response) =>{
      this._navController.navigateRoot("/home");
      this.perfil = response;
      console.log(this.perfil.user);
      this._storage.set("dadosUsuario", this.perfil.user);
    })
    
  }


  cadastro() {
    this._navController.navigateRoot("/escolha");
  }

}
