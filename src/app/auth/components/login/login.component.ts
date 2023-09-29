import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    email: [
      { value: 'tour@of.heroes', disabled: true },
      [Validators.email, Validators.required],
    ],
    password: [
      '', [Validators.required, Validators.minLength(10)]
    ],
  });

  constructor(private authService: AuthService, private fb: UntypedFormBuilder) {}

  onSubmit(): void {
    if(this.form.valid){
      this.authService.login(this.form.value);

    }
  }


}
