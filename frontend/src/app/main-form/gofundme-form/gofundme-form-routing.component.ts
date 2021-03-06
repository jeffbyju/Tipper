import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GofundmeFormComponent } from '../gofundme-form/gofundme-form.component';

const routes: Routes = [
    { path: 'gofundme', component: GofundmeFormComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})

export class GofundmeFormRoutingModule {

}