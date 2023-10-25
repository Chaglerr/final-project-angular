import { Injectable } from '@angular/core';
import { IRating, IUser, User, data } from '../../interfaces/interfaces';
import { BehaviorSubject, flatMap, map, of } from 'rxjs';
import { HttpsService } from '../http/https.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpsService) {
    // Check if the user is already logged in when the service is initialized
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.restoreLoggedInUser(user);
    }
  }

  private liveDataSubject = new BehaviorSubject<data>({
    users: [{email: "g@gmail.com", password:"paroli11", nickname: "gio", id: "u0", posts: [], rating: {rating: 0 , ratedNum: 0}, isAdmin: false}], currentUserId: "-1", isAdmin: false
  });

  public currentState = this.liveDataSubject.asObservable();
  public currUserId = "-1";
  private nextId = "";
  private isAdmin = false;
  private errorSubject = new BehaviorSubject<string>(''); 
  public error$ = this.errorSubject.asObservable();
  private errorSubjectLogin = new BehaviorSubject<string>(''); 
  public errorLogin$ = this.errorSubjectLogin.asObservable();

  public validLoginData(email: string, password: string) {
    return this.http.getUsers().pipe(
      map((users) => {
        if (users) {
          const matchingUser = users.find(user => user.email === email && user.password === password);
          if (matchingUser) {
            console.log('User is logged in as:', matchingUser.email);

            // Store user data in local storage
            localStorage.setItem('loggedInUser', JSON.stringify(matchingUser));

            this.restoreLoggedInUser(matchingUser);
            return true;
          }
        }
        this.currUserId = "-1";
        this.errorSubjectLogin.next('Invalid Email or Password');
        return false;
      })
    );
  }


  
   
  public registerUser(user: User): void {
    const data = this.liveDataSubject.getValue();
  
    // Fetch the list of users and check if the email already exists
    this.http.getUsers().subscribe((existingUsers) => {
      const emailExists = existingUsers.some((existingUser) => existingUser.email === user.email);
      if (emailExists) {
        // Emit an error message if the email already exists
        this.errorSubject.next('User with the same email already exists.');
      } else {
        this.nextId = `${crypto.randomUUID()}`;
        const firstRating: IRating = { rating: 0, ratedNum: 0 };
        data.users.push({
          ...user,
          posts: [],
          id: this.nextId,
          rating: firstRating,
          isAdmin: false,
        });
        this.http.addUser({ ...user, id: this.nextId, posts: [], rating: firstRating, isAdmin: false })
          .subscribe(
            (response) => {
              console.log('Successfully created a new record:', response);
            },
            (error) => {
              console.error('Error creating a new record:', error);
              this.errorSubject.next('Invalid Info ' + error);
            }
          );
        this.liveDataSubject.next(data);
      }
    });
  }

  public registerAdmin(user: User): void {
    const data = this.liveDataSubject.getValue();
  
    // Fetch the list of users and check if the email already exists
    this.http.getUsers().subscribe((existingUsers) => {
      const emailExists = existingUsers.some((existingUser) => existingUser.email === user.email);
      if (emailExists) {
        // Emit an error message if the email already exists
        this.errorSubject.next('User with the same email already exists.');
      } else {
        this.nextId = `${crypto.randomUUID()}`;
        const firstRating: IRating = { rating: 0, ratedNum: 0 };
        data.users.push({
          ...user,
          posts: [],
          id: this.nextId,
          rating: firstRating,
          isAdmin: true,
        });
        this.http.addUser({ ...user, id: this.nextId, posts: [], rating: firstRating, isAdmin: true })
          .subscribe(
            (response) => {
              console.log('Successfully created a new record:', response);
            },
            (error) => {
              console.error('Error creating a new record:', error);
              this.errorSubject.next('Invalid Info ' + error);
            }
          );
        this.liveDataSubject.next(data);
      }
    });
  }




  private printdata(){
    const data = this.liveDataSubject.getValue();
    for(let i = 0; i < data.users.length; i++){
      console.log(data.users[i]);
    }
  }

  public logOut(): void {
    localStorage.removeItem('loggedInUser'); // Remove user data from local storage
    const previousData = this.liveDataSubject.getValue();
    previousData.currentUserId = "-1";
    previousData.isAdmin = false;
    this.liveDataSubject.next(previousData);
  }

  public getUser(id: string): IUser{
    const data = this.liveDataSubject.getValue();
    for(let i = 0; i < data.users.length; i++){
      if(data.users[i].id === id) return data.users[i];
    }
    const dummyRate: IRating = {rating: 0, ratedNum: 0};
    let dummyUser = {id: "-1", email: "", nickname: "", password: "", posts: [], rating: dummyRate, isAdmin: false};
    return dummyUser;
  }

  private restoreLoggedInUser(user: IUser) {
    // Update the service's state to reflect the logged-in user
    const previousData = this.liveDataSubject.getValue();
    previousData.currentUserId = user.id;
    this.currUserId = user.id;
    if (user.isAdmin === true) {
      console.log('User has admin privileges.');
      previousData.isAdmin = true;
    }
    this.liveDataSubject.next(previousData);
  }



}
