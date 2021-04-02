import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup , Validators,  } from '@angular/forms';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';
import { BuyService } from '../buy.service';
import { AuthService } from '../auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public precio1:number = 5000;
  public precio2:number = 45000;
  public precio3:number = 95000;
  public cantidad1:boolean = true;
  public cantidad2:boolean = false;
  public cantidad3:boolean = false;


  datos;
  spinner: boolean = true;
  form: FormGroup;
  
  constructor(    
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    public auth : AuthService,
    private buy: BuyService,
    private routes : ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      opcion: [ , Validators.required],
      cantidad: [ 1, Validators.required]
    });


  this.routes.paramMap
      .subscribe((params : ParamMap) => {
      let id = + params.get('id');
      this.traerDatos(id);
    });


  this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
    (response: any) => {
      console.log(response)
    },(error) => {
      console.log(error);
      this.auth.logout()
    })

  }

  async traerDatos(id:number){
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/details/` + id).subscribe(
      (data): any =>{
        this.datos = data;
      },(error)=>{
        console.log("Ah ocurrido un error")
      }
    );
  }

  async onSubmit(){
    if (this.form.valid){
      let data ={
          name: this.datos,
          opcion: this.form.value.opcion,
          cantidad: this.form.value.cantidad,
      };
      this.buy.RecibirInformacion(data);
      this.route.navigate( ['/compras']);
    }
  }

}
