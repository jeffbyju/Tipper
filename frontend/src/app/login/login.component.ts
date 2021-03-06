import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signup : boolean = true;

  constructor(
    private http : HttpClient,
    private store : Store<IAppState>
  ) { }

  ngOnInit(): void {

  }

  loginOption(value : string) {
    if (value == "signup") {
      this.signup = true;
    } else {
      this.signup = false;
    }
  }
}
