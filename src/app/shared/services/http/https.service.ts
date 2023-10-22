import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, IUser } from '../../interfaces/interfaces';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';

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

  public getUserById(id: string): Observable<IUser> {
    const endpoint = `/users/${id}`;
    const url = this.baseUrl + endpoint;
    return this.http.get<IUser>(url);
  }

  public getPosts(): Observable<IPost[]>{
    const endpoint = '/posts';
    const fullUrl = this.baseUrl + endpoint;
    return this.http.get<IPost[]>(fullUrl);
  }


  public savePostsToServer(postToAdd: IPost) {
    const endpoint = '/posts';
    const fullUrl = this.baseUrl + endpoint;
    return this.http.post(fullUrl, postToAdd).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating a new record:', error);
        return throwError('Failed to create a new record. Status: ' + error.status + ', Error Message: ' + error.message);
      })
    );
  }

  public updateUserPosts(id: string, iuser: IUser) {
    const endpoint = `/users/${id}`;
    const fullurl = this.baseUrl + endpoint;

    this.http.patch(fullurl, iuser).subscribe(
      (response) => {
        console.log(`Successfully patched user with ID ${id}:, response`);
      },
      (error) => {
        console.error(`Error patching user with ID ${id}:, error`);
      }
    );
  }

  public deleteUserWithId(id: string){
    const endpoint = `/users/${id}`;
    const fullurl = this.baseUrl + endpoint;
    this.http.delete(fullurl).subscribe(
      (response) => {
        console.log(`Successfully deleted user with ID ${id}:, response`);
      },
      (error) => {
        console.error(`Error deleting user with ID ${id}:, error`);
      }
    );
  }

  public deletePostWithId(id: string){
    const endpoint = `/posts/${id}`;
    const fullurl = this.baseUrl + endpoint;
    this.http.delete(fullurl).subscribe(
      (response) => {
        console.log(`Successfully deleted user with ID ${id}:, response`);
      },
      (error) => {
        console.error(`Error deleting user with ID ${id}:, error`);
      }
    );
  }
}
