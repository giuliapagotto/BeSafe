import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [MenuComponent],
    imports: [IonicModule],
    exports: [MenuComponent]
})

export class ComponentsModule {}