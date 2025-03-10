import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { Employee, IProjectObj } from '../../model/Employee';
import { MasterService } from '../../service/master.service';



@Component({
  selector: 'app-project',
  imports: [CommonModule,ReactiveFormsModule,AsyncPipe,DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  initialView :string="List";
  projectForm: FormGroup=new FormGroup({});
  masterServ=inject(MasterService);
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();
  projectList: IProjectObj[] = [];
  constructor() { 
    this.initialization();
    this.employeeData$=this.masterServ.getEmployeeList();
  }
  ngOnInit(): void {
    this.getAllProjects();
  }
  initialization(project ?: IProjectObj){
  this.projectForm = new FormGroup({
    
      projectId :new FormControl(project?project.projectId : 0),
      projectName:new FormControl(project?project.projectName:'' ),
      clientName:new FormControl(project?project.clientName:'' ),
      startDate:new FormControl(project?project.startDate : ''),
      leadByEmpId:new FormControl(project?project.leadByEmpId :'' ),
      contactPerson:new FormControl(project?project.contactPerson : ''),
      contactNo:new FormControl(project?project.contactNo:'' ),
      emailId:new FormControl(project ? project.emailId : ''),
    
    });
    this.initialView="form";
  }
  onFormSubmit() {
    if (!this.projectForm.valid) {
      alert("Form is invalid!");
      console.log("Form errors:", this.projectForm.errors);
      return;
    }
  
    if (this.initialView === "form") {
      this.onUpdateProject(); // Call update function if editing
    } else {
      this.onSaveProject(); // Call save function if creating
    }
  }
  
  onSaveProject() {
    
  
    if (!this.projectForm.valid) {
      alert("Form is invalid!");
      console.log("Form errors:", this.projectForm.errors);
      return;
    }
  
    const formValue = this.projectForm.value;
    console.log("Form Values:", formValue); // Debugging
  
    this.masterServ.createNewProject(formValue).subscribe(
      (res: IProjectObj) => {
        console.log("Project Created Successfully:", res);
        alert("Project Created Successfully");
      },
      (error) => {
        console.error("Error in creating project", error);
        alert("Error in creating project");
      }
    );
  }
    getAllProjects(){
      this.masterServ.getProjects().subscribe((res:IProjectObj[])=>{
        this.projectList=res;
      });

    }
    onEdit(project:IProjectObj){
      
      this.initialization(project);
    }
    onUpdateProject(){
      if (!this.projectForm.valid) {
        alert("Form is invalid!");
        console.log("Form errors:", this.projectForm.errors);
        return;
      }
    
      const formValue = this.projectForm.value;
      console.log("Form Values:", formValue); // Debugging
    
      this.masterServ.updateProject(formValue).subscribe(
        (res: IProjectObj) => {
          console.log("Project Updated Successfully:", res);
          alert("Project Updated Successfully");
          this.getAllProjects();
          this.initialView="List";
        },
        (error) => {
          
          alert("Error in updating project");
        }
      );
    }
  onDelete(projectId:number){
    debugger;
    this.masterServ.deleteProject(projectId).subscribe((res)=>{
      debugger;
      alert("Project Deleted Successfully");
      this.getAllProjects();
    },(error)=>{
      debugger;
      alert("Error in deleting project");
    });
  }
  }

