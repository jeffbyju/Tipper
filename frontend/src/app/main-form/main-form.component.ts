import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IGoFundMe, IService, IUser } from '../models/user-form';
import { AddService, SetFacebook, SetGoFundMe, SetUser } from '../store/actions/data.actions';
import { getData, selectGoFundMe, selectServices, selectUser } from '../store/selectors/data.selectors';
import { IAppState } from '../store/state/app.state';
import { IDataState } from '../store/state/data.state';


@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  mainForm = this.formBuilder.group({
    id: '',
    firstname: '',
    lastname: ''
  })

  user : IUser = {
    id : '',
    firstname : '',
    lastname : ''
  }
  selectUser$ = this.store.pipe(select(selectUser));

  gofundme : IGoFundMe | null = null;
  selectGoFundMe$ = this.store.pipe(select(selectGoFundMe));

  services : IService[] = [];
  selectServices$ = this.store.pipe(select(selectServices));

  selectAllData$ = this.store.pipe(select(getData));

  
  allURL = "http://localhost:5000/api/get-user"
  successURL = "http://localhost:5000/api/check-user"
  postURL = "http://localhost:5000/api/create-user"

  constructor(
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private store : Store<IAppState>,
    private router : Router,
    private http : HttpClient
  ) { }

  loadData(id : string | null) {
    if (id !== null) {
      this.http.get<IDataState>(this.allURL + "/" + id)
      .subscribe((data) => {
        this.store.dispatch(new SetUser({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname
        }))

        if (data.gofundme !== null) {
          this.store.dispatch(new SetGoFundMe(
            data.gofundme
          ))
        }

        if (data.facebook !== null) {
          this.store.dispatch(new SetFacebook(
            data.facebook
          ))
        }

        data.services.map((service) => {
          this.store.dispatch(new AddService(service))
        })

      })
    }
  }

  ngOnInit(): void {
    var id : string | null = this.route.snapshot.paramMap.get('id')
    if (id !== null) {
      console.log(id);
      this.http.get<any>(this.successURL + "/" + id)
        .subscribe((data) => {
          if (data.success) {
            this.loadData(id);
          }
        })
    }
    

    this.selectUser$.subscribe((data) => {
      this.user = {
        id : data.id,
        firstname : data.firstname,
        lastname : data.lastname
      }
    })

    this.selectGoFundMe$.subscribe((data) => {
      if (data !== null) {
        var newGoFundMe : IGoFundMe | null = {
          url: data?.url,
          picture: data?.picture,
          title: data?.title,
          description: data?.description 
        }
      } else {
        var newGoFundMe : IGoFundMe | null = null;
      }

      this.gofundme = newGoFundMe;
    });

    this.selectServices$.subscribe((data) => {
      this.services = [
        ...data
      ]
    })

  }

  onSubmit(): void {
    var dataState : IDataState; 

    this.selectAllData$.subscribe((data) => {
      dataState = data;
      console.log(data);
      this.http.post<IDataState>(
        this.postURL,
        dataState,
        // {'Content-Type': 'application/json'}
      ).subscribe((resp) => {
        console.log(resp)
      })
      console.log(JSON.stringify(data));
    })
  }

  addGoFundMe(): void {
    this.router.navigate(['/gofundme']);
  }

  goToDelivery(): void {
    this.router.navigate(['/delivery'])
  }
}
