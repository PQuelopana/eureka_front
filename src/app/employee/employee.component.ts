import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  DSLista: MatTableDataSource<EmployeeModel>;
  DCLista = [
    'name',
    'lastName', 
    'dateOfBirth', 
    'dateOfAdmission', 
    'afp', 
    'position',
    'salary'
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.fb.group({
      id: 0,
      name: '',
      lastName: '',
      dateOfBirth: '',
      dateOfAdmission: '',
      afp: '',
      position: '',
      salary: 0
    });
  }

  ngOnInit(): void {
  }

  new() {
    Object.keys(this.form.controls).forEach( key => {
      if (['id', 'salary'].includes(key)) {
        this.form.controls[key].setValue(0);
      } else {
        this.form.controls[key].setValue('');
      }
    });
  }

  edit(employee: EmployeeModel) {
    Object.keys(this.form.controls).forEach( key => this.form.controls[key].setValue(employee[key]));
  }

  save() {
    if (this.form.value.id === 0) {
      this.employeeService.insert(this.form.value).subscribe(resp => this.list());
    } else {
      this.employeeService.put(this.form.value).subscribe(resp => this.list());
    }
  }

  delete(id: number) {
    this.employeeService.delete(id).subscribe(resp => this.list());
  }

  getOne(id: number) {
    this.employeeService.getById(id).subscribe(resp => {
      Object.keys(this.form.controls).forEach( key => this.form.controls[key].setValue(resp[key]));
    });
  }

  list() {
    this.employeeService.list().subscribe(resp => {
      this.DSLista = new MatTableDataSource(resp);
    });
  }

}
