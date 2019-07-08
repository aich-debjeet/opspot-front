import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable()
export class FormValidator {

    static emailMobileValidation(input: AbstractControl) {
        if (input.value === '') {
            return;
        }
        const inputVal = input.get('forgotpInput').value;
        if (inputVal) {
            if (isNaN(inputVal)) { // not a number, checking for valid email
                const email = input.get('forgotpInput').value;
                // tslint:disable-next-line: max-line-length
                const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!(emailRegex.test(email))) {
                    return { invalidEmail: true };
                }
                return null;
            } else { // checking for valid number (country code + mobile)
                // let mobileNumber = input.get("forgotpInput").value;
                // let mobileRegex = /^\+[0-9]{2,3}-[0-9]\d{10}/;
                // if (!(mobileRegex.test(mobileNumber)))
                //   return { invalidMobile: true };
            }
            return null;
        }
    }

    static checkPassword(ac: AbstractControl) {
        const password = ac.value;
        if (ac.value === '') {
            return;
        }
        // let passwordRegex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if (!passwordRegex.test(password)) {
            return { invalidPassword: true };
        }
        return null;
    }

    static otpValidation(ac: AbstractControl) {
        if (ac.get('otpNum1').value.length === 0
            || ac.get('otpNum2').value.length === 0
            || ac.get('otpNum3').value.length === 0
            || ac.get('otpNum4').value.length === 0
            || ac.get('otpNum5').value.length === 0
            || ac.get('otpNum6').value.length === 0) {
            return { invalidOtp: true };
        }
        return null;
    }

      // check for confirm password
      static passwordConfirmcheck(c: AbstractControl) {
        if (c.get('newPassword').value !== c.get('confirmPassword').value) {
            return { passwordMismatched: true };
        }
        return null;
    }
}