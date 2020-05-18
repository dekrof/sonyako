import DeviceType from "@model/DeviceDetectModel";
import { AppModel } from "@model/AppModel";

import { observable, action, computed } from "mobx";
import { injectable, inject } from "inversify";
import { morphism, Schema } from "morphism";

const schema: Schema = {
    avatar: "avatar",
    username: "username",
    password: "password",
    deviceType: "deviceType"
}

@injectable()
export class SignInModel {

    private appModel: AppModel;

    public avatar: string;

    @observable
    public username: string;

    @observable
    public password: string;

    constructor(@inject(AppModel) appModel: AppModel) {
        this.appModel = appModel;
    }

    @computed
    public get isOK() {
        return !!this.password && !!this.username;
    }

    @computed
    public get deviceType(): DeviceType {
        return this.appModel.deviceType;
    }

    @action
    public submitLogin() {
        console.log(morphism(schema, this));
    }
}
