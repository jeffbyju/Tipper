import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeliversFormComponent } from '../delivers-form/delivers-form.component';

const routes: Routes = [
    { path: 'delivery', component: DeliversFormComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})

export class DeliversFormRoutingModule {

}