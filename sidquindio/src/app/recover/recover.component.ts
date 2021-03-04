import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

form: FormGroup;
spinner: boolean = true;

constructor(
  private fb: FormBuilder, 
  private route: Router,
  private client: ClientService) { }

ngOnInit(): void {
  this.form = this.fb.group({
    codigo: ['', Validators.required],
    password: ['', Validators.required],
    validatepassword: ['', Validators.required],
  });
} 


async onSubmit(){

  if (this.form.valid){
    let data ={
      nombre: this.form.value.nombre,
      password: this.form.value.password,
      validatepassword: this.form.value.password
    }
    
    console.log(data);
    this.spinner = false;
    this.client.postRequest(`${environment.BASE_API_REGISTER}/recuperacion` , data).subscribe(
    (response: any) => {
      this.route.navigate( ['/login']);
      console.log(response);
    },
    (error) => {
      this.spinner = true;
      console.log(error);
    })
  } else {

    console.log("Error");
  }
  
}

}
