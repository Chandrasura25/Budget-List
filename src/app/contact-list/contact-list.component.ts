import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(public actRoute:ActivatedRoute,public contactService: ContactService) { }
  public goodTable =[];
  public message ='';
  public id = '';
  public idItem='';
  public blur:any =''
  public popup:any = ''
  public viewup:any = ''
  public Budget:any =[];
  public UserName:any = '';
  public Items:any =[];
  public relationship = '';
  public BudgetArray:any = [];
  public status = false;
  public userObj:any={};
  public amount_goods:any ='';
  public total_amount:any ='';
  public quantity:any ='';
  public name_good:any = '';
  public totalquantity:any ='';

  ngOnInit(): void {
    let id = this.actRoute.snapshot.params['id']
    this.BudgetArray = this.contactService.getUser()
    this.userObj = this.contactService.currentUser()
    let user = this.BudgetArray.find((user:any)=>user.username==this.userObj.username && user.password == this.userObj.password) 
    if(user){
      this.UserName=user.username
      let index = this.BudgetArray.findIndex((x:any) => x.username === this.UserName);
      this.Budget=this.BudgetArray[index].Budget
      let found = this.BudgetArray[index].Budget.find((ind:any) => ind == id);
      this.id=id;
    this.goodTable = this.Budget[this.id].Item
    }
  }

  toggled(){
  this.status= true;
  }
  edit(id:any, item: any){
   this.blur= document.getElementById('blur')?.classList; 
   this.popup= document.getElementById('popup')?.classList; 
    this.blur.toggle('active');
    this.popup.toggle('active');
    this.name_good = item.name_good
    this.amount_goods = item.amount_goods
    this.quantity = item.quantity
    this.idItem = id;
    this.totalquantity=(this.amount_goods * this.quantity)
  }
 view(id:any, item: any){
  this.blur= document.getElementById('blur')?.classList; 
  this.viewup= document.getElementById('viewup')?.classList; 
  this.name_good = item.name_good
  this.amount_goods = item.amount_goods
  this.quantity = item.quantity
  this.blur.toggle('active');
  this.viewup.toggle('active');
  }
  cancel(){
  this.blur= document.getElementById('blur')?.classList; 
  this.viewup= document.getElementById('viewup')?.classList;
  this.blur.toggle('active');
  this.viewup.toggle('active');
  }
  updateGood(){
   this.blur= document.getElementById('blur')?.classList; 
   this.popup= document.getElementById('popup')?.classList; 
    this.blur.toggle('active');
    this.popup.toggle('active');
    this.goodTable.map((item:object,index:any)=>{
      if(index == this.idItem){
        this.Budget[this.id].Item[index].name_good = this.name_good;
        this.Budget[this.id].Item[index].quantity = this.quantity;
        this.Budget[this.id].Item[index].amount_goods = this.amount_goods;
        this.totalquantity=(this.amount_goods * this.quantity)
        this.Budget[this.id].Item[index].totalquantity = this.totalquantity;
        console.log(item);      
      }
    })
    localStorage.setItem('Budget',JSON.stringify(this.BudgetArray));
    console.log(this.BudgetArray)
    this.ngOnInit();
  }
  delete(id:any){
    this.Budget[this.id].Item = this.Budget[this.id].Item.filter((_:any,index:any)=>(index !== id));
   console.log(this.Budget[this.id].Item);
   localStorage.setItem('Budget',JSON.stringify(this.BudgetArray))
    this.ngOnInit();
  };
}