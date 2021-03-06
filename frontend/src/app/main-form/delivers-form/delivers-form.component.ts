import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IService } from 'src/app/models/user-form';
import { AddService } from 'src/app/store/actions/data.actions';
import { selectUser } from 'src/app/store/selectors/data.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-delivers-form',
  templateUrl: './delivers-form.component.html',
  styleUrls: ['./delivers-form.component.css']
})
export class DeliversFormComponent implements OnInit {
  backendUrl = "assets/jsons/services.json"
  services : IService[] = [];
  filterServices : IService[] = [];
  selectedServices : IService[] = [];

  selectedUsers$ = this.store.pipe(select(selectUser));

  inputValue = "";

  constructor(
    private http : HttpClient,
    private store : Store<IAppState>,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.http.get<IService[]>(this.backendUrl)
      .subscribe((data) => {
        this.services = [
          ...this.services,
          ...data
        ]
        console.log(this.services)
      })
  }

  onFilter(value : string): void {
    this.filterServices = this.services.filter((data : IService) => {
      var lower_val = value.toLowerCase();
      var lower_data_name = data.name.toLowerCase();
      return lower_val.length != 0 && lower_data_name.indexOf(lower_val) != -1;
    })
  }

  addService(service : IService) {
    this.selectedServices = [
      ...this.selectedServices,
      service
    ];

    this.store.dispatch(new AddService(service));
  }

  returnMain(): void {
    var id = '';
    this.selectedUsers$.subscribe((data) => {
      id = data.id;
    })
    this.router.navigate(['/profile', id])
  }
}
