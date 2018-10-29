import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Constants} from "../app/Constants";
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {User} from "../models/user.model";

@Injectable()
export class UserService {
  private subject: Subject<User> = new Subject<User>();
  private user: User = new User();

  constructor(private storage: Storage) {
    this.storage.get(Constants.SESSION.USER).then((user) => {
      if (user) {
        this.user = new User(user);
        this.notifyUserUpdated(this.user);
      }
    });
  }

  private notifyUserUpdated(user: User): void {
    this.subject.next(user);
  }

  public getUser(): User {
    return this.user;
  }

  public getUserAsObservable(): Observable<User> {
    console.log("UserService getUserAsObservable()");
    return this.subject.asObservable();
  }

  public updateSession(user: User) {
    let newUser: User = new User(user);
    this.storage.set(Constants.SESSION.USER, newUser);
    this.user = newUser;
    this.notifyUserUpdated(newUser);
  }
}
