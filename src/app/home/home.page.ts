import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public formPublicacao: FormGroup;
  public formComentario: FormGroup;
  public formId: FormGroup;
  public arrObjPost;
  public arrObjComent;
  public userId;
  public denunciaTexto;
  @ViewChild('inputPost', { static: false }) inputPost: ElementRef;
  @ViewChild('inputComentario', { static: false }) inputComentario: ElementRef;


  constructor(private _formBuilder: FormBuilder, private toastController: ToastController, private _http: HttpClient,
    private _storage: Storage) {
    this.formId = this._formBuilder.group({
      sId: new FormControl(""),
      sNome: new FormControl(""),
    });
    this.formPublicacao = this._formBuilder.group({
      sTexto: new FormControl("", Validators.compose([Validators.required]))
    });
    this.formComentario = this._formBuilder.group({
      sComentario: new FormControl("", Validators.compose([Validators.required]))
    })
  }

  ngOnInit() {
    this._storage.get("dadosUsuario").then((oCadastro) => {
      document.querySelector(".id").setAttribute("value", oCadastro._id);
      document.querySelector(".nomeUser").setAttribute("value", oCadastro.nome);
    })
    document.querySelector("app-menu").removeAttribute("hidden");

    this.getPost();
    this.getComent();
  }

  getPost() {
    this._http.get("http://localhost:3333/posts").subscribe((response) => {
      console.log(response)
      this.arrObjPost = response;

    })
  }

  getComent() {
    this._http.get("http://localhost:3333/comentarios").subscribe((response) => {
      console.log(response)
      this.arrObjComent = response;

    })
  }

  resize() {
    this.inputPost.nativeElement.style.height = "50px";
    this.inputPost.nativeElement.style.height = this.inputPost.nativeElement.scrollHeight + 'px';

    this.inputComentario.nativeElement.style.height = "45px";
    this.inputComentario.nativeElement.style.height = this.inputComentario.nativeElement.scrollHeight + 'px';
  }

  onSubmit(tipo) {
    if (tipo == 'publicar') {
      let options = {
        headers: {
          'nomeUser': [this.formId.controls.sNome.value],
          'user_id': [this.formId.controls.sId.value],
          "texto": [this.formPublicacao.controls.sTexto.value]
        }
      };
      document.querySelector("textarea").value = "";

      console.log(this.formId.controls.sNome.value);
      
      this._http.post("http://localhost:3333/posts", null, options).subscribe((response) => {
        console.log(response);
        this.presentToast();
        this.getPost();
      })
    }
    if (tipo == 'comentar') {
      let options = {
        headers: {
          'nomeUser': [this.formId.controls.sNome.value],
          'user_id': [this.formId.controls.sId.value],
          "texto": [this.formComentario.controls.sComentario.value]
        }
      };
      // document.querySelector("textarea").value = "";

      this._http.post("http://localhost:3333/comentarios", null, options).subscribe((response) => {
        console.log(response);
        this.presentToast();
        this.getComent();
      })
    }
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

  comentario($event) {
    document.querySelector(".comentarios").toggleAttribute("hidden");
    
  }

  denuncia(tipo) {
    document.querySelector("#mensagemDenuncia").toggleAttribute("hidden");
    document.querySelector("#conteudo").setAttribute("style", "opacity: 0.7; filter: blur(1px);");
    if (tipo == "pub") {
      this.denunciaTexto = "Deseja denunciar essa publicação?";
      console.log("pub");

    }
    if (tipo == "usu") {
      this.denunciaTexto = "Deseja denunciar esse usuário?";
      console.log("usu");

    }
    else {
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
