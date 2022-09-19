import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[appPassword]',
  providers:[
    {provide: NG_VALIDATORS, useExisting: PasswordDirective, multi:true}
  ]
})
export class PasswordDirective {

  constructor() { }
  validate(control:AbstractControl): {[key: string] : any} | null {
    if (control.value) {
      if (control.value.test(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")) == false) {
        return {codeError: true}
      } 
    } 
    return null
   }
}
