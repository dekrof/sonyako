import { observable } from "mobx";

import { SpriteCollection } from "@dicebear/avatars";
import female from "@dicebear/avatars-female-sprites";
import human from "@dicebear/avatars-human-sprites";
import male from "@dicebear/avatars-male-sprites";

import { injectable } from "@ioc/app-module-decorator";

enum Gender {
    MALE, FEMALE, HUMAN
}

namespace Gender {
    export function getSprites(gender: Gender): SpriteCollection {
        switch (gender) {
            case Gender.FEMALE: return female;
            case Gender.HUMAN: return human;
            case Gender.MALE: return male;
        }
    }
}

export { Gender }

@injectable()
export class UserModel {

    public avatarUrl: string;

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
}
