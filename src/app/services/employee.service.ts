import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    urlApi = 'localhost:3000/';

    constructor(
        private http: HttpClient
    ) {}

    list(): Observable<EmployeeModel[]> {

        const url = `${this.urlApi}employees`;

        return this.http.get<EmployeeModel[]>(url);
    }

    getById(id: number): Observable<EmployeeModel> {

        const url = `${this.urlApi}employees/${id}`;

        return this.http.get<EmployeeModel>(url);
    }

    insert(employee: EmployeeModel): Observable<any> {

        const url = `${this.urlApi}employee`;

        return this.http.post<any>(url, employee);
    }

    put(employee: EmployeeModel): Observable<any> {

        const url = `${this.urlApi}employee`;

        return this.http.put<any>(url, employee);
    }

    delete(id: number): Observable<any> {

        const url = `${this.urlApi}employees/${id}`;

        return this.http.delete<EmployeeModel>(url);
    }
}
