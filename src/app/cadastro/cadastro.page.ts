import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public formEmail: FormGroup;
  public formCadastro: FormGroup;
  public formUsuario: FormGroup;
  public slidesOptions = {
     allowTouchMove: false,
     simulateTouch: false
  };
  public slides;
  public erro;


  constructor(private _formBuilder: FormBuilder, private _navController: NavController, private _http: HttpClient,
    private sanitizer: DomSanitizer, private storage: Storage, private toastController: ToastController) {
    this.formEmail = this._formBuilder.group({
      sEmail: new FormControl("", Validators.compose([Validators.required, Validators.email]))
    });
    this.formCadastro = this._formBuilder.group({
      sNome: new FormControl("", Validators.compose([Validators.required])),
      sCelular: new FormControl("", Validators.compose([Validators.required])),
      sCpf: new FormControl("", Validators.compose([Validators.required])),
      sDataNascimento: new FormControl("", Validators.compose([Validators.required])),
      sSexo: new FormControl("M")
    });
    this.formUsuario = this._formBuilder.group({
      sUsuario: new FormControl("", Validators.compose([Validators.required])),
      sSenha: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
    this.slides = document.querySelector("#slides");
    document.querySelector("app-menu").setAttribute("hidden", "true");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuário cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }


  onSubmit() {
    let options = {
      headers: {
        "nome": [this.formCadastro.controls.sNome.value],
        "sexo": [this.formCadastro.controls.sSexo.value],
        "nascimento": [this.formCadastro.controls.sDataNascimento.value],
        "celular": [this.formCadastro.controls.sCelular.value],
        "cpf": [this.formCadastro.controls.sCpf.value],
        "email": [this.formEmail.controls.sEmail.value],
        "login": [this.formUsuario.controls.sUsuario.value],
        "senha": [this.formUsuario.controls.sSenha.value]
      }
    }


    this._http.post('http://localhost:3333/sessions', null, options).subscribe((response) => {
      console.log(response)
      this.erro = response;
      if(this.erro.erro){
        setTimeout(() => {
          document.querySelector("#error").innerHTML = `<ion-icon slot="start" name="information-circle-outline" style="color: red;"></ion-icon>`+ this.erro.erro;
        }, 500);
      }
      else{
        setTimeout(() => {
          this.presentToast();
          this._navController.navigateRoot("/login");
  
        }, 1000);
      }
     
     

    });

  }

  avancar() {
    this.slides.slideNext();
  }
  voltar() {
    this.slides.slidePrev();
  }

}
