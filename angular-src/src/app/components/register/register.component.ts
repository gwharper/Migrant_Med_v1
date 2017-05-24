import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  name: String;
  username: String;
  password: String;
  email: String;
  phone: String;
  state: String;
  city: String;
  experience: String;
  specialty: String;
  wages: String;

  constructor(private validateService: ValidateService) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
   const user = {
      name:       this.name,
      username:   this.username,
      password:   this.password,
      email:      this.email,
      phone:      this.phone,
      state:      this.state,
      city:       this.city,
      experience: this.experience,
      specialty:  this.specialty,
      wages:      this.wages
    };

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      // this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      console.log('all fields required')
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      // this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
 }
}
