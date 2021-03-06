import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IGoFundMe, IService } from '../models/user-form';
import { selectGoFundMe, selectServices } from '../store/selectors/data.selectors';
import { IAppState } from '../store/state/app.state';


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

  gofundme : IGoFundMe | null = null;
  selectGoFundMe$ = this.store.pipe(select(selectGoFundMe));

  services : IService[] = [];
  selectServices$ = this.store.pipe(select(selectServices));

  constructor(
    private formBuilder : FormBuilder,
    private store : Store<IAppState>,
    private router : Router
  ) { }

  ngOnInit(): void {
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
        ...this.services,
        ...data
      ]
    })

  }

  onSubmit(): void {
    console.log(this.mainForm.value)
  }

  addGoFundMe(): void {
    this.router.navigate(['/gofundme']);
  }

  goToDelivery(): void {
    this.router.navigate(['/delivery'])
  }
}
