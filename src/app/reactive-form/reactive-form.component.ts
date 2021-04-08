import { CustomvalidationService } from './../services/customvalidation.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  cookies: any;
  errorMessage: string = '';
  successMessage: string = '';
  datas: any[] = [];
  dataSource: any;
  displayedColumns: string[];

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.cookies = this.cookieService.getAll();

    Object.keys(this.cookies).forEach((e) =>
      this.datas.push(JSON.parse(this.cookies[e]))
    );
    console.log(this.datas);

    this.displayedColumns = [
      'name',
      'e-mail',
      'username',
      'password',
    ];
    this.dataSource = this.datas;

    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          [Validators.required],
          this.customValidator.userNameValidator.bind(this.customValidator),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      if (this.cookieService.hasKey(this.registerForm.get('username').value)) {
        this.errorMessage =
          'The user with username ' +
          this.registerForm.get('username').value +
          ' already exists!!';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      } else {
        this.cookieService.putObject(this.registerForm.get('username').value, {
          Name: this.registerForm.get('name').value,
          email: this.registerForm.get('email').value,
          username: this.registerForm.get('username').value,
          password: this.registerForm.get('password').value,
        });
        this.successMessage =
          'The user with username ' +
          this.registerForm.get('username').value +
          ' saved successfully!!';

        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      }
    }
    this.cookies = this.cookieService.getAll();
    console.log(this.cookies);
  }
}
