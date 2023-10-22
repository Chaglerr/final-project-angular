import { Injectable } from '@angular/core';
import { IUser, User, data } from '../../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { HttpsService } from '../http/https.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpsService) { }

  private liveDataSubject = new BehaviorSubject<data>({
    users: [{email: "g@gmail.com", password:"paroli11", nickname: "gio", id: "u0", posts: []}], currentUserId: "-1"
  });

  public currentState = this.liveDataSubject.asObservable();
  public currUserId = "-1";
  private nextId = "";

  public async validLoginData(email: string, password: string): Promise<boolean> {
    try {
      const users: IUser[] | undefined = await this.http.getUsers().toPromise();
      if (users) {
        const matchingUser = users.find(user => user.email === email && user.password === password);
  
        if (matchingUser) {
          const previousData = this.liveDataSubject.getValue();
          previousData.currentUserId = matchingUser.id;
          this.liveDataSubject.next(previousData);
          this.currUserId = matchingUser.id;
          return true;
        }
      }
  
      this.currUserId = "-1";
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }
   
  public registerUser(user: User): void {
    const data = this.liveDataSubject.getValue();
    this.nextId = `${crypto.randomUUID()}`;
    data.users.push({
      ...user,
      posts: [], 
      id: this.nextId,
    });
    this.http.addUser({...user, id: this.nextId, posts: []})
    .subscribe(
    (response) => {
      console.log('Successfully created a new record:', response);
    },
    (error) => {
      console.error('Error creating a new record:', error);
    }
  );
    this.liveDataSubject.next(data);
    //this.printdata();
  }

  private printdata(){
    const data = this.liveDataSubject.getValue();
    for(let i = 0; i < data.users.length; i++){
      console.log(data.users[i]);
    }
  }

  public logOut(): void{
    const previousData = this.liveDataSubject.getValue();
    previousData.currentUserId = "-1";
    this.liveDataSubject.next(previousData);
  }

  public getUser(id: string){
    const data = this.liveDataSubject.getValue();
    for(let i = 0; i < data.users.length; i++){
      if(data.users[i].id === id) return data.users[i];
    }
    let dummyUser = {id: "-1", email: "", nickname: "", password: "", posts: []};
    return dummyUser;
  }

  
}
