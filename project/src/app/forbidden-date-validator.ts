import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class DateValidator {
  static below(): ValidatorFn {
    const today: Date = new Date();
    return (control: AbstractControl): { [key: string]: any } | null => {
        const date = new Date(control.value);
        const forbidden: boolean = date >= today;
      return forbidden ? { 'forbiddenDate': { value: control.value } } : null;
    };
  }
  static compareFromTo: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const fromString = control.get('from').value;
    const toString = control.get('to').value;
    if(!fromString && !toString) {
      return null;
    }
    const from = new Date(fromString);
    const to = new Date(toString);
    
    return from < to ? null : {'dateRangeNotValid': true};
  }
}
