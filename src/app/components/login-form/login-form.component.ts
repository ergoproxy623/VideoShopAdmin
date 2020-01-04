import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  hide = true;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

}

