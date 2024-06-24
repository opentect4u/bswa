import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  conditionalRequiredValidator(triggerField: string, dependentFields: string[]): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const triggerValue = formGroup.get(triggerField)?.value;
      let hasError = false;

      dependentFields.forEach((field) => {
        const control = formGroup.get(field);
        if (triggerValue && !control?.value) {
          control?.setErrors({ required: true });
          hasError = true;
        } else {
          control?.setErrors(null);
        }
      });

      return hasError ? { conditionalRequired: true } : null;
    };
  }
}