import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { } 
  public getContact(){
    // return JSON.parse(localStorage['totalAmount'])
    return JSON.parse(localStorage.getItem('budget_user') !)
  }
  public getUser(){
    return JSON.parse(localStorage.getItem('Budget') !)
  }
  public currentUser(){
    return JSON.parse(localStorage.getItem('current_user') !)
  }
}
