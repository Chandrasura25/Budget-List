import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import {HomeComponent} from './home/home.component'
import { ShowDateComponent } from './show-date/show-date.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './signup/signup.component';
import { BudgetGuard } from './guards/budget.guard';
import { ViewListComponent } from './view-list/view-list.component';  

const routes: Routes = [
  {path:'signup',component:SignUpComponent},
  {path:'signin',component:SignInComponent},
  {path:"", redirectTo:'home', pathMatch:"full"}, 
  {path:'home',component:HomeComponent},
  {path:'createGoods',component:SignupComponent},
  {path:'contact',children:[
   {path:'',component:ContactComponent},
  ],canActivate:[BudgetGuard]},
  {path:'contactList',component:ContactListComponent},
  {path:'showDate',children:[
   {path:'',component:ShowDateComponent},
   {path:'amount/:id',children:[
   {path:'',component:SignupComponent},
   {path:'details',component:ContactListComponent},
   {path:'details/items/:id',component:ViewListComponent}
  ],
   canActivate:[BudgetGuard]
  }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
