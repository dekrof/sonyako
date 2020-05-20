import { flow, IValueWillChange, observable, observe } from "mobx";
import { injectable } from "@ioc/app-module-decorator";
import { DeviceType, JwtAuthenticationDto } from "@client/api-client";
import { detectDevice, fingerprintDevice, Fingerprints } from "@model/DeviceDetectModel";
import { notification } from "antd";

@injectable()
export class AppModel {

    public deviceType: DeviceType

    public deviceFingerPrint: Fingerprints;

    @observable
    public jwt: JwtAuthenticationDto;

    @observable
    public isLoading: boolean = false;

    constructor() {
        this.deviceType = detectDevice();
        this.fingerprint();

        observe(this, "jwt", (ev: IValueWillChange<JwtAuthenticationDto>) => {
            if (ev.newValue) {
                console.log("Setup a new notification", ev.newValue);

                const closer = setTimeout(() => {
                    notification.info({
                        message: "Session Expiration",
                        description: "Your session will expire after 1 minute. Would you like to continue?",
                        duration: 60 * 1000
                    });
                    clearInterval(closer);
                }, ev.newValue.expiryDuration - 60 * 1000);
            }
        });
    }

    private fingerprint = flow(function* () {
        this.deviceFingerPrint = yield fingerprintDevice();
    });
}
