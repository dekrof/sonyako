import { AppModel } from "@model/AppModel";

import { computed, observable } from "mobx";
import { inject, injectable } from "inversify";
import { Schema } from "morphism";
import { AxiosAuthenticationClient, DeviceType } from "@client/api-client";
import { task } from "mobx-task";

const schema: Schema = {
    avatar: "avatar",
    username: "username",
    password: "password",
    deviceType: "deviceType"
}

@injectable()
export class SignInModel {

    public avatar: string;

    @observable
    public username: string;

    @observable
    public password: string;

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosAuthenticationClient) private client: AxiosAuthenticationClient
    ) {
    }

    @computed
    public get isOK() {
        return !!this.password
            && !!this.username;
    }

    @computed
    public get deviceType(): DeviceType {
        return this.appModel.deviceType;
    }

    @task
    public async submitLogin() {
        const language = this.appModel.deviceFingerPrint.get("language") as string;
        console.log(this.client, language, this.appModel.deviceFingerPrint);
        // need to create a valid login response
        // return await this.client.authenticateUser(LoginDto.fromData(morphism(schema, this)));
    }
}
