import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-green-child',
  templateUrl: './green-child.component.html',
  styleUrls: ['./green-child.component.css'],
})
export class GreenChildComponent implements OnInit, OnDestroy {
  private selector: string;

  isSubmitted = false;

  // City Names
  City: any = ['Denver', 'Tampa', 'Philadelphia', 'Washington DC'];

  /*########### Form ###########*/
  registrationForm = this.formBuilder.group({
    cityName: ['', [Validators.required]],
  });

  constructor(private elementRef: ElementRef, public formBuilder: FormBuilder) {
    this.selector = elementRef.nativeElement.tagName;
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  ///////methods/////////////

  // Choose city using select dropdown
  changeCity(e: any) {
    console.log(e.value);
    this.cityName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // Getter method to access formcontrols
  get cityName() {
    return this.registrationForm.get('cityName');
  }

  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      //return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value));
    }
  }
}
