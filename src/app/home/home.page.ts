import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public denunciaTexto;
 
  @ViewChild('inputPost', { static: false }) inputPost: ElementRef;
  @ViewChild('inputComentario', { static: false }) inputComentario: ElementRef;

  public formPublicacao: FormGroup;
  public formComentario: FormGroup;

  constructor(private _formBuilder: FormBuilder, private toastController: ToastController) { 
    this.formPublicacao = this._formBuilder.group({
      sTexto: new FormControl("", Validators.compose([Validators.required]))
    });
    this.formComentario = this._formBuilder.group({
      sComentario: new FormControl("", Validators.compose([Validators.required]))
    })
  }

  ngOnInit() {
    document.querySelector("app-menu").removeAttribute("hidden");
  }

  resize() {
    this.inputPost.nativeElement.style.height = "50px";
    this.inputPost.nativeElement.style.height = this.inputPost.nativeElement.scrollHeight + 'px';

    this.inputComentario.nativeElement.style.height = "45px";
    this.inputComentario.nativeElement.style.height = this.inputComentario.nativeElement.scrollHeight + 'px';
  }

  onSubmit() {
    let postData = new FormData

    postData.append("Texto", this.formPublicacao.value)
    postData.append("Comentario", this.formComentario.value)

    console.log(this.formPublicacao.value);
    console.log(this.formComentario.value);

    document.querySelector("textarea").value= "";

    this.presentToast();

  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Publicado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
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

  opcoes() {
    document.querySelector("#opcoes").toggleAttribute("hidden");
    document.querySelector("#conteudo").setAttribute("style", "opacity: 0.7; filter: blur(1px);");
  }
}
