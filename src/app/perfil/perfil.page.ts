import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  @ViewChild('inputComentario', { static: false }) inputComentario: ElementRef;

  public formComentario: FormGroup;
  public denunciaTexto;

  constructor( private _formBuilder: FormBuilder, private _toastController: ToastController, private storage: Storage) {
    this.formComentario = this._formBuilder.group({
      sComentario: new FormControl("", Validators.compose([Validators.required]))
    })
   }

  ngOnInit() {
    // this.storage.get("Cadastro").then((oCadastro) => {

    // })   
    // this.storage.get("Email");
    // this.storage.get("Usuario");

  }

  resize() {
    this.inputComentario.nativeElement.style.height = "45px";
    this.inputComentario.nativeElement.style.height = this.inputComentario.nativeElement.scrollHeight + 'px';
  }

  onSubmit() {
    let postData = new FormData

    postData.append("Comentario", this.formComentario.value)

    console.log(this.formComentario.value);

    document.querySelector("textarea").value= "";

    this.presentToast();

  }

  edit() {

  }
  
  async presentToast() {
    const toast = await this._toastController.create({
      message: 'Publicado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this._toastController.create({
      message: 'Denúncia enviada com sucesso! Obrigado por sua contribuição',
      duration: 3000
    });
    toast.present();
  }

  comentario() {
    document.querySelector("#comentarios").toggleAttribute("hidden");
  }

  denuncia(tipo) {
    document.querySelector("#mensagemDenuncia").toggleAttribute("hidden");
    document.querySelector("#conteudo").setAttribute("style", "opacity: 0.7; filter: blur(1px);");
    if(tipo == "pub"){
      this.denunciaTexto = "Deseja denunciar essa publicação?";
      console.log("pub");
      
    }
    if(tipo == "usu") {
      this.denunciaTexto = "Deseja denunciar esse usuário?";
      console.log("usu");
      
    }
    else{
      this.denunciaTexto = "Deseja denunciar esse comentário?";
      console.log("else");
      

    }
  }

  denunciaUsuario() {
    document.querySelector("#opcoes").setAttribute("hidden", "true");
    this.denuncia("usu");
  }

  dismiss() {
    document.querySelector("#mensagemDenuncia").setAttribute("hidden", "true");
    document.querySelector("#conteudo").removeAttribute("style");

  }

  prosseguir() {
    document.querySelector("#mensagemDenuncia").setAttribute("hidden", "true");
    document.querySelector("#conteudo").removeAttribute("style");

    this.presentToast2();
    
  }

  dismissOpt() {
    document.querySelector("#opcoes").setAttribute("hidden", "true");
    document.querySelector("#conteudo").removeAttribute("style");

  }

  opcoes() {
    document.querySelector("#opcoes").toggleAttribute("hidden");
    document.querySelector("#conteudo").setAttribute("style", "opacity: 0.7; filter: blur(1px);");
  }
}
