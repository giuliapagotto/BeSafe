import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {

  public formCrp: FormGroup;
  public formEmail: FormGroup;
  public formCadastro: FormGroup;
  public formUsuario: FormGroup;
  public slidesOptions: {
    allowTouchMove: false,
    simulateTouch: false
  }
  public slides;
  public cadastro = true;

  constructor(private _formBuilder: FormBuilder, private _navController: NavController, private _http: HttpClient,
    private sanitizer: DomSanitizer, private storage: Storage) {
    this.formCrp = this._formBuilder.group({
      sRg: new FormControl("", Validators.compose([Validators.required])),
      sCrp: new FormControl("", Validators.compose([Validators.required]))
    })
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

    this.cadastro = false;

    let postData = new FormData

    postData.append("Crp" ,this.formCrp.value)
    postData.append("Email", this.formEmail.value),
    postData.append("Cadastro", this.formCadastro.value),
    postData.append("Usuario", this.formUsuario.value)

    console.log(this.formCrp.value);
    console.log(this.formEmail.value);
    console.log(this.formCadastro.value);
    console.log(this.formEmail.value);


    // this._http.get('localhost:3333/sessions').pipe(map((response: any) => response.json())).subscribe(data => {
    //   console.log(data);
    // });

    this._http.get('localhost:3333/sessions').subscribe((response) => {
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
  login() {
    this._navController.navigateRoot("/login");
  }
}
