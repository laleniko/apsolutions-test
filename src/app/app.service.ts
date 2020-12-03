import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from './models/data.model';
import { tap } from 'rxjs/operators';
import { AvatarUrls } from './models/avatarUrls.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  avatarUrls: AvatarUrls = {
    child: '../assets/child.png',
    adult: '../assets/adult.png',
    old: '../assets/old.png'
  }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('../assets/mates.json').pipe(
      tap((data: Data[] ) => {
        data.map(user => user.avatarUrl = this.getAvatarUrl(user.age));
      })
    );
  }

  getAvatarUrl(age: number): string {
    if (age < 18) {
      return this.avatarUrls.child;
    } else if (age >= 18 && age < 60) {
      return this.avatarUrls.adult;
    } else {
      return this.avatarUrls.old;
    }
  }
}
