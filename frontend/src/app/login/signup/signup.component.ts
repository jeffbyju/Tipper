import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IsSet, SetUser } from 'src/app/store/actions/data.actions';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.formBuilder.group({
    id: '',
    firstname: '',
    lastname: '',
    password: '',
  })

  backendURL = "http://localhost:5000/api/create-account/"
  
  constructor(
    private http : HttpClient,
    private router : Router,
    private store : Store<IAppState>,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
  }


  onSubmit() : void {
    console.log(this.signupForm.value);
    var signupVals = this.signupForm.value;
    this.http.post<any>(
      this.backendURL, 
      {
        id: signupVals.id,
        firstname: signupVals.firstname,
        lastname: signupVals.lastname,
        password: signupVals.password
      }
    ).subscribe((resp) => {
      console.log(resp)
      this.store.dispatch(new IsSet(true));
      this.store.dispatch(new SetUser({
        id: signupVals.id,
        firstname: signupVals.firstname,
        lastname: signupVals.lastname,
        password: signupVals.password
      }))

      this.router.navigate(['/profile', signupVals.id])
    })

    
  }
}
