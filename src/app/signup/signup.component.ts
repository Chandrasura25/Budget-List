import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public contactService: ContactService,public actRoute:ActivatedRoute) { }
  public amount_goods:any ='';
  public total_amount:any ='';
  public quantity:any ='';
  public name_good = '';
  public result:any ='';
  public percent:any='';
  public totalquantity:any ='';
  public amountRemaining:any ='';
  public amountMessage='total amount';
  public BudgetArray:any =[];
  public Budget:any =[];
  public UserName:any = '';
  public userObj:any={};
  public id ='';
  public message = 'Welcome, Add the goods for your purchase';
  ngOnInit(): void {
    this.BudgetArray = this.contactService.getUser()
    this.userObj = this.contactService.currentUser()
    let user = this.BudgetArray.find((user:any)=>user.username==this.userObj.username && user.password == this.userObj.password) 
    if(user){
      this.UserName=user.username
      this.message= `Welcome ${this.UserName}, Add the goods for your purchase`;
      let index = this.BudgetArray.findIndex((x:any) => x.username === this.UserName);
      this.Budget=this.BudgetArray[index].Budget
      let id = this.actRoute.snapshot.params['id']
       let found = this.BudgetArray[index].Budget.find((ind:any) => ind == id);
      this.id=id;
      let index1 = this.Budget[this.id].Item.findIndex((x:any) => x.totalquantity === this.totalquantity);
        this.total_amount = this.Budget[this.id].total_amount;
        this.result = this.Budget[this.id].usedup
        let resulti = this.Budget[this.id].Item.reduce((accumulator:any, obj:any) => {
          return accumulator + obj.totalquantity;
       }, 0);
       this.amountRemaining = (this.total_amount - resulti)
    
       this.Budget[this.id].usedup=resulti
     }
     
    localStorage.setItem('Budget',JSON.stringify(this.BudgetArray))
    this.percent=((0.3) * (this.total_amount))
    if(this.amountRemaining <= this.percent){
      this.message=`you have just 30 percent or less of your money, Be careful so you don't walk home`
   }
     console.log(this.result)
    }
    creategoods (){
     let goodExist = this.Budget[this.id].Item.findIndex((x:any) => x.name_good === this.name_good);
    if(goodExist == -1){
      this.totalquantity=(this.amount_goods * this.quantity)
    let goodObj = {
      amount_goods:this.amount_goods,
      name_good:this.name_good,
      quantity:this.quantity,
      status:false,
      totalquantity:this.totalquantity,
    }
    this.Budget[this.id].Item.push(goodObj)
    this.total_amount = this.Budget[this.id].total_amount;
    this.result = this.Budget[this.id].Item.reduce((accumulator:any, obj:any) => {
      return accumulator + obj.totalquantity;
   }, 0);
    this.Budget[this.id].usedup = this.result 
    localStorage.setItem('Budget',JSON.stringify(this.BudgetArray))
    this.amountRemaining = (this.total_amount - this.result)
    this.message='Goods Added! Click the blue tag to view your list of Goods';
    this.amount_goods='';
    this.quantity='';
    this.name_good='';
    this.percent=((0.3) * (this.total_amount))
    if(this.amountRemaining <= this.percent){
       this.message=`you have just 30 percent or less of your money, Be careful so you don't walk home`
    }
  }
    else{
    this.message='You have already listed this item'
  }
  }
}
