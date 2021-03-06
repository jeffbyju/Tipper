import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


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

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.mainForm.value)
  }
}
