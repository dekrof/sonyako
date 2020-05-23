import { AppModel } from "@page/app-layout/app-layout.model";

import { action, computed, observable } from "mobx";
import { inject, injectable } from "inversify";

import {
    ApiResponse,
    AxiosAuthenticationClient,
    DeviceInfoDto,
    DeviceType,
    JwtAuthenticationDto,
    LoginDto
} from "@client/api-client";

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

    @action
    public async submitLogin(): Promise<ApiResponse<string>> {
        const {deviceFingerPrint, deviceType} = this.appModel;

        const login = LoginDto.fromData({
            email: this.username,
            username: this.username,
            password: this.password,
            deviceInfo: DeviceInfoDto.fromData({
                deviceType: deviceType,
                deviceId: deviceFingerPrint.get("userAgent"),
                notificationToken: deviceFingerPrint.encode()
            })
        });

        try {
            const response = await this.client.authenticateUser(login);
            this.appModel.jwt = response.data as JwtAuthenticationDto;

            return ApiResponse.fromData({
                data: "User login successfully",
                success: true
            } as any, String);
        } catch (ex) {
            if (ex.response) {
                return ex.response.data as ApiResponse<string>
            }
        }
    }
}
