import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
       
constructor(public contactService: ContactService,public router:Router) { }
 public total_amount:any ='';
 public date = '';
 public BudgetArray:any = [];
 public userObj:any={};
 public id ='';
 public message = '';
 public UserName='';

  ngOnInit(): void {
    this.BudgetArray = this.contactService.getUser()

    this.userObj = this.contactService.currentUser()
    let user = this.BudgetArray.find((user:any)=>user.username==this.userObj.username && user.password == this.userObj.password)
    console.log(user);
    
     if(user){
        this.UserName=user.username
        this.message= `Welcome ${this.UserName}, Add the total amount for your purchase`;
        let index = this.BudgetArray.findIndex((x:any) => x.username === this.UserName);
        this.id=index;
     }
     else{
      this.router.navigate(['/signin'])
    }
  }
  createtAmount (){
    let totalAmountObj = {
      total_amount:this.total_amount,
      date:this.date,
      usedup:0,
      Item:[]
    }
    this.BudgetArray[this.id].Budget.push(totalAmountObj)
    localStorage.setItem('Budget',JSON.stringify(this.BudgetArray))
    this.message='Total Amount Added! Click the red tag to add your list of Goods';
    console.log(this.BudgetArray);
    this.total_amount='';
    this.date='';
  }
}