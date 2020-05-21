import { flow, IValueWillChange, observable, observe } from "mobx";
import { persist } from "mobx-persist";
import { inject } from "inversify";

import { injectable } from "@ioc/app-module-decorator";
import { DeviceType, JwtAuthenticationDto } from "@client/api-client";

import { JwtHelper } from "@model/JwtHelper";
import { detectDevice, fingerprintDevice, Fingerprints } from "@model/DeviceDetectModel";

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


    constructor(
        @inject(JwtHelper) public helper: JwtHelper
    ) {
        this.deviceType = detectDevice();
        this.fingerprint();

        observe(this, "jwt", (ev: IValueWillChange<JwtAuthenticationDto>) => {
            if (ev.newValue) {
                console.log("new JWT recieved");
            }
        });
    }

    private fingerprint = flow(function* () {
        this.deviceFingerPrint = yield fingerprintDevice();
    });
}
