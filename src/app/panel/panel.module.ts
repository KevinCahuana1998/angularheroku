// Modulos

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module';

// Componentes
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';


import { MomentModule } from 'ngx-moment';
// Ngmodule
@NgModule({
    declarations: [
        AddComponent,
        EditComponent,
        ListComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        PanelRoutingModule,
        MomentModule
    ],
    exports: [
        AddComponent,
        EditComponent,
        ListComponent,
        MainComponent
    ],
    providers: []
})

export class PanelModule {}
