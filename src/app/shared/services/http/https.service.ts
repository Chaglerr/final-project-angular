import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/interfaces';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(private http: HttpClient) {}
  baseUrl: string = "http://localhost:3000";

  public addUser(user: IUser){
    const endpoint = '/users';
    const fullUrl = this.baseUrl + endpoint;
    return this.http.post(fullUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating a new record:', error);
        return throwError('Failed to create a new record. Status: ' + error.status + ', Error Message: ' + error.message);
      })
    );
  }

  public getUsers(): Observable<IUser[]>{
    const endpoint = '/users';
    const fullUrl = this.baseUrl + endpoint;
    return this.http.get<IUser[]>(fullUrl);
  }
}
