import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Employee, IAPIResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  
  employeeObj:Employee=new Employee();
  departmentList:IParentDept[]=[];
  childDeptList:IChildDept[]=[];
  deptId:number=0;
  employeeList:Employee[]=[];
  masterServ=inject(MasterService);
  ngOnInit(): void {
    this.getParentDeptList();
    this.getEmployeeList();
  }
  getParentDeptList(){
    this.masterServ.getParentDept().subscribe((res:IAPIResponse)=>{
      this.departmentList=res.data;
    })
      
  }
  // getChildDeptList(parentDeptId:number){
  //   this.masterServ.getChildDept(parentDeptId).subscribe((res:IAPIResponse)=>{
  //     this.childDeptList=res.data;
  //   })
  // }
  onDeptChange(){
    this.masterServ.getChildDept(this.deptId).subscribe((res:IAPIResponse)=>{
      this.childDeptList=res.data;
    })
  }
  onSaveEmp(){
    debugger;
    this.masterServ.createEmployee(this.employeeObj).subscribe((res:Employee)=>{
      debugger;
      
        alert("Employee Created Successfully");
        this.getEmployeeList();

      // Reset the form (optional)
      this.employeeObj = new Employee(); 

      },error=>{
        alert("Something went wrong");
      })
      
  }
  getEmployeeList(){
    this.masterServ. getEmployeeList().subscribe((res:Employee[])=>{
      this.employeeList=res;
    })
      
  }
  onDelete(id:number){
    const result=confirm("Are you sure you want to delete this employee?");
    if(result){
      this.masterServ.deleteEmployee(id).subscribe((res:Employee)=>{
        
          alert("Employee Deleted Successfully");
          this.getEmployeeList();
      },error=>{
          alert("Error from Api");
        }
      )
    }
    
  }
  onEdit(obj:Employee){
    this.employeeObj=obj;

  }
  onUpdateEmp(){
    this.masterServ.updateEmployee(this.employeeObj).subscribe((res:Employee)=>{
      debugger;
      
        alert("Employee upadted Successfully");
        this.getEmployeeList();
      this.employeeObj = new Employee(); 

      },error=>{
        alert("Something went wrong");
      })
  }
}
