import { inject, injectable } from "inversify";
import { toJS, action } from "mobx";

import { AxiosAuthenticationClient } from "@client/api-client";

import { AppModel } from "@page/app-layout";
import { UserModel } from "@page/sign-up/tab/user";
import { SkillModel } from "@page/sign-up/tab/skill";
import { AddressModel } from "@page/sign-up/tab/address";

@injectable()
export class SignUpModel {

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(UserModel) private userModel: UserModel,
        @inject(SkillModel) private skillModel: SkillModel,
        @inject(AddressModel) private addressModel: AddressModel,
        @inject(AxiosAuthenticationClient) private client: AxiosAuthenticationClient
    ) {}

    @action
    public submitRegistration() {
        console.log(toJS(this.userModel));
    }
}
