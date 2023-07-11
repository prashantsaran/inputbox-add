import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Details } from '../interface/details';


import { DetailsServiceService } from '../service/details-service.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {
  // details: Details = {} as Details;
  detailsService : DetailsServiceService=inject(DetailsServiceService);
  
  

  validType:boolean | undefined;
  myForm = new FormGroup({
    phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    selectedType: new FormControl(''),
  

   
  });
  selectedType: string="";
  get phone() {
    return this.myForm.get('phone');
  }

  get email() {
    return this.myForm.get('email');
  }
  get name(){
    return this.myForm.get('name');
  }
  constructor() {} // Inject the DetailsServiceService
  
  info:string=""
  detailss:Details={} as Details;

 
  getDetails(): any {
if(this.myForm.value.selectedType=="email"){
  this.info=this.myForm.value.email!;
}
else{
  this.info=this.myForm.value.phone!;
}


    const details={
      
      info:this.info,
      name:this.myForm.value.name,
      type:this.myForm.value.selectedType,

    }
   
    
    // this.details.email = this.myForm.value.email!;
    // this.details.name = this.myForm.value.name!;
    // this.details.phone = this.myForm.value.phone;
    return details;
  }
  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value;
  }
  
  isValid():boolean{
    const validation={
      emailValid:this.email?.valid,
      nameValid:this.name?.valid,
      phoneValid:this.phone?.valid
      
    }
  this.validType=validation.emailValid || validation.phoneValid;
    console.log(this.validType,validation.nameValid)
    if(this.validType && validation.nameValid){
      return true;
    }
    return false;
  }
 


}

