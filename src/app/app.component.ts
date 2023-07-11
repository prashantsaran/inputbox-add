import { Component, QueryList, ViewChildren, inject,AfterViewInit } from '@angular/core';
import { DetailsServiceService } from './service/details-service.service';
import { Details } from './interface/details';
import { FirstComponent } from './first/first.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent  {
  @ViewChildren(FirstComponent) childComponents!: QueryList<any>;
detailsService:DetailsServiceService=inject(DetailsServiceService);

components:any[]=[{}]
message:string=""
show:boolean=true
hi:boolean=true;
  addComponent() {
    this.components.push({});
  }



  saveDetails() {
        
      this.childComponents.forEach(childComponent => {
     
        const childDetails = childComponent.getDetails();
        // const childValidDetails=childComponent.isValid();
        // console.log("###",childValidDetails);
        // this.show=this.show && childValidDetails;
        // console.log(this.show);
  console.log('0000000',childDetails)
  
        this.detailsService.addDetails(childDetails);
  
       this.detailsService.postDetails.subscribe((response: any) => {
        if(response.status=200 && this.show){
          this.show=true;
        }
    console.log(response);});
      });
       
      



   
  }
}
