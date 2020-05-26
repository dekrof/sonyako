import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FormikProps } from "formik";

import { SpriteCollection } from "@dicebear/avatars";
import female from "@dicebear/avatars-female-sprites";
import human from "@dicebear/avatars-human-sprites";
import male from "@dicebear/avatars-male-sprites";

import { injectable, observable } from "@page/decorator";
import { RegistrationDto, Profile } from "@client/api-client";

enum Gender {
    MALE, FEMALE, HUMAN
}

namespace Gender {
    export function getSprites(gender: Gender): SpriteCollection {
        // @formatter:off;
        switch (gender) {
            case Gender.FEMALE: return female;
            case Gender.HUMAN:  return human;
            case Gender.MALE:   return male;
        }
        // @formatter:on;
    }
}

export { Gender }

class Matchers {
    static USERNAME = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/;
    static PASSWORD = /[!%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/;
    static ONLY_DIGITS = /\D+/g;
    static ONLY_CAPITALS = /[^A-Z]+/g;
    static EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    static NAME = /(\b[a-z](?!\s))/g;

}

export enum PhoneNumberResult {
    EMPTY, NOT_VALID, SUCCESS
}

@injectable()
export class UserModel {

    public avatarUrl: string;

    public phoneNumberCountry: string;

    public form: FormikProps<UserModel>;

    @observable
    public username: string;

    @observable
    public primaryPassword: string;

    @observable
    public confirmPassword: string;

    @observable
    public email: string;

    @observable
    public name: string;

    @observable
    public patronymicName: string;

    @observable
    public surname: string;

    @observable
    public birthday: Date;

    @observable
    public phoneNumber: string;

    @observable
    public gender: Gender = Gender.HUMAN;

    @observable
    public loading: boolean;

    public validateUsername(value: string) {
        let error: string = null;
        if (!value) {
            error = "Username should not be empty";
        } else if (value.trim().length > 12 || value.trim().length < 6) {
            error = "Username should has length between 6 and 12 symbols inclusively";
        } else if (Matchers.USERNAME.test(value.trim())) {
            error = "Username should not contains special characters or whitespaces";
        }
        return error;
    }

    public validatePrimaryPassword(value: string) {
        let error: string = null;
        if (!value) {
            error = "Password should not be empty";
        } else if (value.trim().length < 8) {
            error = "Password should has length greater than 8 symbols inclusively";
        } else if (Matchers.PASSWORD.test(value.trim())) {
            error = "Password contains whitespaces or deined symbols";
        } else if (value.replace(Matchers.ONLY_DIGITS, "").length < 2 || value.replace(Matchers.ONLY_CAPITALS, "").length < 2) {
            error = "Password should has at least 2 digits and 2 uppercase letters";
        } else if (value.trim() !== this.confirmPassword) {
            error = "Password is not confirmed";
        }
        return error;
    }

    public validateEmail(value: string) {
        let error: string = null;
        if (!value) {
            error = "Email should not be empty";
        } else if (!Matchers.EMAIL.test(value.toLowerCase())) {
            error = "Email address is not valid";
        }
        return error;
    }

    public validatatePhoneNumber(value: string, callback: (result: PhoneNumberResult) => void = (result) => null) {
        let error: string = null;
        if (!value) {
            error = "Phone number should not be empty";
            callback(PhoneNumberResult.EMPTY);
        } else {
            let normalized = value.trim();
            if (value.startsWith("0")) {
                normalized = `+38${value}`;
            } else if (value.charAt(0) !== "+") {
                normalized = `+${value}`;
            }
            const result = parsePhoneNumberFromString(normalized);
            if (!result || !result.isPossible() || !result.isValid()) {
                error = "Phone number is not valid";
                callback(PhoneNumberResult.NOT_VALID);
            } else {
                this.phoneNumber = result.number.toString();
                this.phoneNumberCountry = result.country || "UA";
                callback(PhoneNumberResult.SUCCESS);
            }
        }
        return error;
    }

    public validateNames(value: string, name: string) {
        let error: string = null;
        if (!value) {
            name = name.replace(Matchers.NAME, (char) => char.toUpperCase());
            error = `${name} should not be empty`;
        }
        return error;
    }

    public toRegistration(): RegistrationDto {
        const profile = {
            avatarUrl: this.avatarUrl,
            birthday: this.birthday,
            email: this.email,
            // gender: this.gender,
            name: this.name,
            patronymicName: this.patronymicName,
            surname: this.surname,
            phoneNumber: this.phoneNumber,
        } as Profile;

        return {
            email: this.email,
            username: this.username,
            password: this.primaryPassword,
            registerAsFreelancer: true,
            profile,
        } as RegistrationDto;
    }
}
