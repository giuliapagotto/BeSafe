import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

  public formPerfil: FormGroup;

  constructor(private _formBuilder: FormBuilder, private storage: Storage, private _toastController: ToastController) { 
    this.formPerfil = this._formBuilder.group({
      sNome: new FormControl("", Validators.compose([Validators.required])),
      sCelular: new FormControl("", Validators.compose([Validators.required])),
      sCpf: new FormControl("", Validators.compose([Validators.required])),
      sDataNascimento: new FormControl("", Validators.compose([Validators.required])),
      sSexo: new FormControl("M", Validators.compose([Validators.required])),
    })
  }

  ngOnInit() {
    this.storage.get("dadosUsuario").then((oCadastro) => {
      document.querySelector(".id").setAttribute("value", oCadastro._id);
      document.querySelector("#nome").setAttribute("value", oCadastro.nome);
      document.querySelector("#celular").setAttribute("value", oCadastro.celular);
      // document.querySelector("#cpf").setAttribute("value", oCadastro.sCpf);
      document.querySelector("#dataNascimento").setAttribute("value", oCadastro.dataNascimento);
      document.querySelector("#sexoInput").setAttribute("value", oCadastro.sexo);

      console.log(oCadastro);
      
    })
  }

  salvar() {
    this.storage.set("Cadastro", this.formPerfil.value);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this._toastController.create({
      message: 'Cadastro alterado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

}
