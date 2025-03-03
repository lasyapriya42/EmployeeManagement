import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAPIResponse, IChildDept, IParentDept } from '../../model/Employee';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  
  departmentList:IParentDept[]=[];
  childDeptList:IChildDept[]=[];
  masterServ=inject(MasterService);
  ngOnInit(): void {
    this.getParentDeptList();
  }
  getParentDeptList(){
    this.masterServ.getParentDept().subscribe((res:IAPIResponse)=>{
      this.departmentList=res.data;
    })
      
  }
  getChildDeptList(parentDeptId:number){
    this.masterServ.getChildDept(parentDeptId).subscribe((res:IAPIResponse)=>{
      this.childDeptList=res.data;
    })
  }

}
