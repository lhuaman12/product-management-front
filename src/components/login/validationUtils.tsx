import { FormValues } from "./FormValues";

export function validation(values: FormValues) {
    let errors: { username?: string, password?: string } = {};

    if (!values.username) {
        errors.username = 'Username is required!';
    } else if (values.username.length <= 1) {
        errors.username = 'Username has to be more than 1 character!';
    }
    if (!values.password) {
        errors.password = 'Password is required!';
    } else if (values.password.length <= 1) {
        errors.password = 'Password has to be more than 1 character!';
    }

    return errors;
}