import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function emailValidator(control: AbstractControl) {
  console.log(control.value);
  if (!control.value.endsWith('.com')) {
    return { invalidemail: true };
  }
  return null;
}
// export function emailValidator(control: FormGroup): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     if (!control.value.startswith('.com')) {
//       return { invalidemail: true };
//     }
//     return null;
//   };
// }
