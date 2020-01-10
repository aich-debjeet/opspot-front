import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import * as moment from 'moment';

@Injectable()
export class FormValidator {

    static validateEmail(input: AbstractControl) {
        if (input.value === '') {
            return;
        }
        const inputVal = input.get('emailInput').value;
        if (inputVal) {
            // tslint:disable-next-line: max-line-length
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!(emailRegex.test(inputVal))) {
                return { invalidEmail: true };
            }
            return null;
        }
    }

    static validateMobileNumber(input: AbstractControl) {
        if (input.value === '') {
            return;
        }
        const inputVal = input.value;
        if (inputVal) {
            // tslint:disable-next-line: max-line-length
            const mobileRegex = /[0-9]{0-10}/;
            if (!(mobileRegex.test(inputVal))) {  
                return { invalidMobile: true };
            }
            return null;
        }
    }




    static mobileValidation(input: AbstractControl) {
        if (input.value === '') {
            return;
        }
        if (input.value) {
        }
        return null;
    }



    static checkPassword(ac: AbstractControl) {
        const password = ac.value;
        if (ac.value === '') {
            return;
        }
        // let passwordRegex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        const passwordRegex = /^(?=.{8,})/;
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


    static validateDate(ac: AbstractControl) {
        const inputValue = ac.value;
        if (inputValue === '') {
            return;
        }
        const dateRegex = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/
        if (!(dateRegex.test(inputValue))) {
            return { invalidDate: true };
        }
        return null;
    }

    static datevalidation(AC: AbstractControl) {
        const date = AC.value.split('-').reverse().join('-');
        const currentDate = moment().format('YYYYMMDD');
        const chooseDate = moment(date).format('YYYYMMDD');

        if (currentDate > chooseDate) {
            return { oldate: true };
        } else {
            return null
        }
    }
}
