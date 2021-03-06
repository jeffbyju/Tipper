import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IGoFundMe } from 'src/app/models/user-form';
import { SetGoFundMe } from 'src/app/store/actions/data.actions';
import { selectGoFundMe, selectUser } from 'src/app/store/selectors/data.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-gofundme-form',
  templateUrl: './gofundme-form.component.html',
  styleUrls: ['./gofundme-form.component.css']
})
export class GofundmeFormComponent implements OnInit {
  gofundmeForm = this.formBuilder.group({
    url: '',
    picture: '',
    title: '',
    description: ''
  })
  selectGoFundMe$ = this.store.pipe(select(selectGoFundMe));
  selectUser$ = this.store.pipe(select(selectUser));

  needsUrl = true;
  editSelected = false;
  requestError = false;
  backendUrl = "http://localhost:5000/api/getGoFundMe"

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private store : Store<IAppState>,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.selectGoFundMe$.subscribe((data) => {
      if (data !== null) {
        this.needsUrl = false;
        this.gofundmeForm.setValue({
          url: data?.url,
          picture: data?.picture,
          title: data?.title,
          description: data?.description
        })
      }
    })
  }

  urlSubmit(): void {
    this.needsUrl = false;
    this.http.post<any>(this.backendUrl, {"url": this.gofundmeForm.value.url})
      .subscribe((data) => {
        if (data.success) {
          this.needsUrl = false; // change to title / description
          this.editSelected = false;
          this.gofundmeForm.setValue({
            ...this.gofundmeForm.value,
            title: data.title,
            description: data.description
          })
        } else {
          this.requestError = true;
        }
      })
  }

  goFundMeSubmit(): void {
    // Update ngrx
    var newGoFundMe : IGoFundMe = {
      url: this.gofundmeForm.value.url,
      picture: this.gofundmeForm.value.picture,
      title: this.gofundmeForm.value.title,
      description: this.gofundmeForm.value.description
    }

    this.store.dispatch(
      new SetGoFundMe(newGoFundMe)
    )

    var id = '';
    this.selectUser$.subscribe((data) => {
      id = data.id;
    })

    this.router.navigate(['/profile', id]);
  }

  changeGoFundMeUrl(): void {
    this.editSelected = true;
  }
}
