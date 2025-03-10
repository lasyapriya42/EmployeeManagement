import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IAPIResponse, IParentDept, IProjectObj } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiStr:string="https://projectapi.gerasim.in/api/EmployeeManagement/";

  constructor(private http:HttpClient) { }
  getParentDept(){
    return this.http.get<IAPIResponse>(this.apiStr+"GetParentDepartment")
  }
  getChildDept(parentDeptId:number):Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(this.apiStr+"GetChildDepartmentByParentId?deptId="+parentDeptId)
  }
  createEmployee(obj :Employee){
    return this.http.post<Employee>(this.apiStr+"CreateEmployee", obj)
  }
  getEmployeeList(){
    return this.http.get<Employee[]>(this.apiStr+"GetAllEmployees")
  }
  deleteEmployee(empId:number){
    return this.http.delete<Employee>(this.apiStr+"DeleteEmployee/"+empId)
  }
  updateEmployee(obj :Employee){
    return this.http.put<Employee>(this.apiStr+"UpdateEmployee/"+obj.employeeId,obj)
  }
  createNewProject(obj:IProjectObj){
    return this.http.post<IProjectObj>(this.apiStr+"CreateProject", obj)
  }
  getProjects(): Observable<IProjectObj[]>{
    return this.http.get<IProjectObj[]>(this.apiStr+"GetAllProjects")
  }
  
  updateProject(obj :IProjectObj): Observable<IProjectObj>{
    return this.http.put<IProjectObj>(this.apiStr+"UpdateProject/"+obj.projectId,obj)
  }
  deleteProject(empId:number){
    return this.http.delete<IProjectObj>(this.apiStr+"DeleteProject/"+empId)
  }
}
