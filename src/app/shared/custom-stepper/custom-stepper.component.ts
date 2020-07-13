import { Component, OnInit } from '@angular/core';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }]
})
export class CustomStepperComponent extends CdkStepper implements OnInit {
  ngOnInit() {
    // this._steps;
  }

  // proximo() {
  //   console.log('disparou proximos');
  //   this.next();
  // }
}
