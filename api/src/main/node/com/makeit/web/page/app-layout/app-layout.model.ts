import { action, flow, IValueWillChange, observable, observe } from "mobx";
import { persist } from "mobx-persist";

import { inject, injectable } from "@page/decorator";
import { AxiosCategoryClient, AxiosUserClient, CategoryDto, DeviceType, JwtAuthenticationDto, RoleName } from "@client/api-client";

import { JwtHelper } from "@model/jwt-helper";
import { detectDevice, fingerprintDevice, Fingerprints } from "@model/device-detect";
import { RoleDto } from '../../client/api-client';

@injectable()
export class AppModel {

    public deviceType: DeviceType

    public deviceFingerPrint: Fingerprints;

    @persist("object") @observable
    public jwt: JwtAuthenticationDto;

    @observable
    public isSecure: boolean = false;

    @observable
    public isLoading: boolean = false;

    @observable
    public categories: CategoryDto[] = [];

    @observable
    public jwtData: any;

    constructor(
        @inject(JwtHelper) public helper: JwtHelper,
        @inject(AxiosUserClient) private userClient: AxiosUserClient,
        @inject(AxiosCategoryClient) private categoryClient: AxiosCategoryClient
    ) {
        this.categoryClient.getCategories({page: 0, size: 6})
            .then(value => value.data.data)
            .then(value => value.content)
            .then(value => this.categories = value);

        this.deviceType = detectDevice();
        this.fingerprint();

        observe(this, "jwt", (ev: IValueWillChange<JwtAuthenticationDto>) => {
            if (ev.newValue) {
                console.log("new JWT received");
                this.jwtData = this.helper.decodeToken(ev.newValue.accessToken);
            }
        });
    }

    @action
    public async getUser() {
        const {tokenType, accessToken} = this.jwt;
        return await this.userClient.getUserProfile({headers: {Authorization: `${tokenType} ${accessToken}`}})
            .then(value => value.data);
    }

    private fingerprint = flow(function* () {
        this.deviceFingerPrint = yield fingerprintDevice();
    });
}
