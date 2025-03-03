import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse } from '../model/Employee';
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
}
