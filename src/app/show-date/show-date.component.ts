import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';
@Component({
  selector: 'app-show-date',
  templateUrl: './show-date.component.html',
  styleUrls: ['./show-date.component.css']
})
export class ShowDateComponent implements OnInit {

  constructor(public contactService: ContactService) { }

  public BudgetArray:any =[];
  public Budget:any =[];
  public UserName:any = '';
  public userObj:any={};
  public id ='';
  public message = '';
  ngOnInit(): void {
    this.BudgetArray = this.contactService.getUser()
    this.userObj = this.contactService.currentUser()
    let user = this.BudgetArray.find((user:any)=>user.username==this.userObj.username && user.password == this.userObj.password) 
    if(user){
      this.UserName=user.username
      this.message= `Welcome ${this.UserName}, Here is the category of your date`;
      let index = this.BudgetArray.findIndex((x:any) => x.username === this.UserName);
      this.id=index;
      this.Budget=this.BudgetArray[index].Budget
      console.log(this.Budget)
     }
 }
}
