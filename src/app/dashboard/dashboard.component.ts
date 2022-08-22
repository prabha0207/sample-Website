import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { DashboardModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue ! : FormGroup;
  dashboardData ! :any;
  showAdd ! : boolean;
  showUpdate! :boolean;
  dashboardModelobj : DashboardModel = new DashboardModel(); 

  constructor(private formBuilder :FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue =this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      emailId:[''],
      mobileNo:['']
    })
    this.getAllDetails();
  }
  clickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate =false;
  }
  postDetails(){
    this.dashboardModelobj.firstName = this.formValue.value.firstName;
    this.dashboardModelobj.lastName = this.formValue.value.lastName;
    this.dashboardModelobj.emailId = this.formValue.value.emailId;
    this.dashboardModelobj.mobileNo = this.formValue.value.mobileNo;
    
    this.api.postData(this.dashboardModelobj)
    // console.log(this.dashboardModelobj);
    .subscribe(res=>{
      // this.dashboardModelobj.firstName;
      console.log(res);
      alert("Data Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllDetails();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }
  getAllDetails(){
    this.api.getData().subscribe(res =>{
      this.dashboardData = res;
    })

  }
  // deleteDetails(row:any){
  //   this.api.deleteData(row.id)
  //   .subscribe(res => {
  //     console.log(res);
  //     alert("Data Deleted Successfully")
  //   })
  // }

  deleteDetails(row : any){
    this.api.deleteData(row.id)
    .subscribe(res => {
      console.log(res);
      alert("Data Deleted Successfully");
      this.getAllDetails();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate =true;
    this.dashboardModelobj.id =row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['mobileNo'].setValue(row.mobileNo);
  }

  updateDetails(){
    this.dashboardModelobj.firstName = this.formValue.value.firstName;
    this.dashboardModelobj.lastName = this.formValue.value.lastName;
    this.dashboardModelobj.emailId = this.formValue.value.emailId;
    this.dashboardModelobj.mobileNo = this.formValue.value.mobileNo;
    
    this.api.updateData(this.dashboardModelobj,this.dashboardModelobj.id)
    .subscribe(res =>{
      alert("Data Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllDetails();
    })
  }

}
