import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formLogin: FormGroup

  constructor(private _navController: NavController, private _http: HttpClient, private _formBuilder: FormBuilder) {
    this.formLogin = this._formBuilder.group({
      sUsuario: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      sSenha: new FormControl("", Validators.compose([Validators.required]))
    });
   }

  ngOnInit() {
    document.querySelector("app-menu").setAttribute("hidden", "true");
  }

  onSubmit() {

    let postData = new FormData;
    postData.append("email", this.formLogin.controls.sUsuario.value);
    postData.append("senha", this.formLogin.controls.sSenha.value);
    console.log(this.formLogin.value);

    this._http.post('localhost:3333/authenticate', postData).subscribe((response) =>{
      console.log(response)
    })
    // this._navController.navigateRoot("/home");
  }


  cadastro() {
    this._navController.navigateRoot("/escolha");
  }

}
