import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CustomValidators } from 'src/app/utils/custom-validator'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('')
  })

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])

    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value)

      this.firebaseSvc.signUp(this.form.value as User).then(res => {
        console.log(res);

      }, error => {
        console.log(error);

      })
    }
  }

} 
