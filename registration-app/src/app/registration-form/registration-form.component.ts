import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { RegistrationRequest } from './registration-request';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public regRequest: RegistrationRequest;
  public countries: any[];
  public showContactError: boolean;

  constructor() { }

  public get eitherFilled(): boolean {
    return this.regRequest.email.length > 0 || this.regRequest.tel.length > 0;
  }

  public get emailFilledTelEmpty() : boolean {
    return this.regRequest.email.length > 0 && !this.regRequest.tel.length;
  }

  public get telFilledEmailEmpty() : boolean {
    return this.regRequest.tel.length > 0 && !this.regRequest.email.length;
  }

  public get bothEmpty(): boolean {
    return !this.regRequest.tel.length && !this.regRequest.email.length;
  }

  ngOnInit() {
    this.regRequest = {
      name: '',
      dob: '',
      nationality: '',
      email: '',
      tel: '',
      pref: ''
    };

    this.countries = [
      { viewValue: 'American', value: 'us' },
      { viewValue: 'British', value: 'uk' },
      { viewValue: 'Canadian', value: 'ca' }
    ];
  }

  public contactFieldChanged(form: FormGroup): void {
    this.regRequest.pref = (this.emailFilledTelEmpty) ? this.regRequest.email
                         : (this.telFilledEmailEmpty) ? this.regRequest.tel
                         : '';

    const emailControl = form.controls.email;
    const telControl = form.controls.tel;

    if (this.eitherFilled) {
      emailControl.clearValidators();
      emailControl.updateValueAndValidity();
      telControl.clearValidators();
      telControl.updateValueAndValidity();
      this.showContactError = false;
    } else if (this.bothEmpty && emailControl.touched && telControl.touched) {
      emailControl.setValidators(Validators.required);
      emailControl.updateValueAndValidity();
      telControl.setValidators(Validators.required);
      telControl.updateValueAndValidity();
      this.showContactError = true;
    }
  }

  public selectPref(pref: string): void {
    this.regRequest.pref = pref;
  }

  public touchedAndInvalid(el: HTMLElement): boolean {
    return el.classList.contains('ng-touched') && el.classList.contains('ng-invalid');
  }

  public submit(form: FormGroup): void {
    if (form.invalid || this.bothEmpty) {
      form.controls.name.markAsTouched();
      form.controls.dob.markAsTouched();
      form.controls.nationality.markAsTouched();
      form.controls.email.setValidators(Validators.required);
      form.controls.email.markAsTouched();
      form.controls.email.updateValueAndValidity();
      form.controls.tel.setValidators(Validators.required);
      form.controls.tel.markAsTouched();
      form.controls.tel.updateValueAndValidity();
      this.showContactError = true;
    } else {
      console.log(JSON.stringify(this.regRequest));
    }
  }

}
