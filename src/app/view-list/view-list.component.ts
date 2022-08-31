import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  constructor(public actRoute:ActivatedRoute, public contactService: ContactService) { }
  public BudgetArray:any = [];
  public message ='';
  public id:any = '';
  public userObj:any={};
  public UserName:any = '';
  public Budget:any =[];
  public goodTable =[];
  
  
  ngOnInit(): void {
    this.BudgetArray = this.contactService.getUser()
    this.userObj = this.contactService.currentUser()
    let user = this.BudgetArray.find((user:any)=>user.username==this.userObj.username && user.password == this.userObj.password) 
    let id = this.actRoute.snapshot.params['id']
    if(user){
      this.UserName=user.username
      let index = this.BudgetArray.findIndex((x:any) => x.username === this.UserName);
      this.Budget=this.BudgetArray[index].Budget
      // let found = this.BudgetArray[index].Budget.find((ind:any) => ind == id);
      // this.id=id;
      // this.goodTable = this.Budget[this.id].Item

      console.log(this.Budget);
      console.log(id);
      
    }
  }

}
