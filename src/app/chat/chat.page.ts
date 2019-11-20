import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'], 
})
export class ChatPage implements OnInit {

  constructor(private _navController: NavController) { }

  public slides;
  ngOnInit() {

    document.querySelector("app-menu").setAttribute("hidden", "true");

    setTimeout(() => {
      document.querySelector(".swiper-pagination-bullet-active").setAttribute("style", "background: white")
      document.querySelector(".swiper-pagination-bullet").setAttribute("style", "background: white")
    },2000)
  }

  itemClick(page) {
    this._navController.navigateRoot("/"+ page);
  }

  animation(){
    document.querySelector("ion-slides").getActiveIndex().then((index) => {
      console.log(index);
      if(index == 3){
          document.querySelector("#money").classList.add("active");
      }
      else{
        document.querySelector("#money").classList.remove("active");
      }
    })
    
    
  }

}
