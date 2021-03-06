import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm = this.formBuilder.group({
    id: '',
    password: ''
  })

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private store : Store<IAppState>
  ) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    console.log(this.signinForm.value)
  }

}
