import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './welcome/layout/layout.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' }
];
