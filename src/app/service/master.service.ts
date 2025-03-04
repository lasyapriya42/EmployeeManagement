import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IAPIResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }
  getParentDept(){
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment")
  }
  getChildDept(parentDeptId:number):Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId?deptId="+parentDeptId)
  }
  createEmployee(obj :Employee){
    return this.http.post<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee", obj)
  }
  getEmployeeList(){
    return this.http.get<Employee[]>("https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees")
  }
  deleteEmployee(empId:number){
    return this.http.delete<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/"+empId)
  }
  updateEmployee(obj :Employee){
    return this.http.put<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee/"+obj.employeeId,obj)
  }
}
