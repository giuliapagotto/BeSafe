import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
 
  constructor(private _formBuilder: FormBuilder, private _navController: NavController, private _http: HttpClient,
    private sanitizer: DomSanitizer, private storage: Storage) {
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

  onSubmit() {
    let postData = new FormData

    postData.append("Email", this.formEmail.value),
      postData.append("Cadastro", this.formCadastro.value),
      postData.append("Usuario", this.formUsuario.value)

    // console.log(this.formEmail.value);
    // console.log(this.formCadastro.value);
    // console.log(this.formEmail.value);


    this._navController.navigateRoot("login");

    // this._http.get('localhost:3333/sessions').pipe(map((response: any) => response.json())).subscribe(data => {
    //   console.log(data);
    // });

    this._http.get('localhost:3333/sessions').subscribe((response) =>{
      console.log(response)
    })

    this.storage.set("Cadastro", this.formCadastro.value);
    this.storage.set("Email", this.formEmail.value);
    this.storage.set("Usuario", this.formUsuario.value);
  }

  avancar() {
    this.slides.slideNext();
  }
  voltar() {
    this.slides.slidePrev();
  }

}
