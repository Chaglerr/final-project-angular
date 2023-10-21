import { Injectable } from '@angular/core';
import { IUser, User, data } from '../../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  private liveDataSubject = new BehaviorSubject<data>({
    users: [{email: "g@gmail.com", password:"paroli11", nickname: "gio", id: "u0", posts: []}], currentUserId: "-1"
  });

  public currentState = this.liveDataSubject.asObservable();
  public currUserId = "-1";
  public nextId = "u1";

  public validLoginData(email: string, password: string): boolean {

    for (const user of this.liveDataSubject.getValue().users) {
      if (user.email === email && user.password === password) {
        const previousData = this.liveDataSubject.getValue();
        previousData.currentUserId = user.id;
        this.liveDataSubject.next(previousData);
        this.currUserId = user.id;
        return true; 
      }
    }
   
    this.currUserId = "-1";
    return false; 
  }


   
  public registerUser(user: User): void {
    const data = this.liveDataSubject.getValue();
    data.users.push({
      ...user, 
      id: this.nextId,
      posts: []
    });
    this.changeId(this.nextId);
    this.liveDataSubject.next(data);
    this.printdata();
  }

  private printdata(){
    const data = this.liveDataSubject.getValue();
    for(let i = 0; i < data.users.length; i++){
      console.log(data.users[i]);
    }
  }

  private changeId(id: string): void {
    const currentIdNumber = parseInt(id.substring(1));
    const nextIdNumber = currentIdNumber + 1;
    this.nextId = 'u' + nextIdNumber.toString(); 
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
