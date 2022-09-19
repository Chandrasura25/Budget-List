import { Component, OnInit } from '@angular/core';
import { FormBuilder,AbstractControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public router: Router,public contactService:ContactService) { }
  public message='';
  public usersArray:any =[];
  public userForm =this.formBuilder.group({
    username:[''],
    phone_no:[''],
    address:[''],
    email:[''],
    password:['',this.validate],
    Budget:[[]]
  });
  validate(control:AbstractControl): {[key: string] : any} | null {
    if (control.value) {
      if (control.value.test(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")) == false) {
        return {codeError: true}
      } 
    } 
    return null
   }
  ngOnInit(): void {
    this.usersArray = this.contactService.getUser()
    console.log(this.usersArray);
   if(this.contactService.getUser()){
    this.usersArray = this.contactService.getUser()
   }
   else{
    this.usersArray=[];
   }
  }
  signUp(){
    let emailExist= this.usersArray.findIndex((Email:any)=>Email.email== this.userForm.value['email'])
    if(emailExist == -1){
      console.log(this.userForm.value)
      this.usersArray.push(this.userForm.value);
      localStorage.setItem('Budget',JSON.stringify(this.usersArray))
      localStorage.setItem('current_user',JSON.stringify(this.userForm.value))
      this.message = 'Sign up is successful'
      this.router.navigate(['/contact'])
    }
      else{
      this.message='This email has already been used'
    }
  }
}