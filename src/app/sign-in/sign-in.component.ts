import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public contactService:ContactService,public router:Router) { }
  public username='';
  public password = '';
  public userArray:any = [];
  ngOnInit(): void {
    this.userArray = this.contactService.getUser()
  }
 signIn(){
  let user = this.userArray.find((user:any)=>user.username==this.username && user.password ==this.password)
  if(user){
    localStorage.setItem('current_user',JSON.stringify(user))
    this.router.navigate(['/contact'])
    console.log(user);
  }
  else{
    this.router.navigate(['/signup'])
  }
 }
}
