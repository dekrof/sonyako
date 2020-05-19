import {flow, observable} from "mobx";
import {injectable} from "@ioc/app-module-decorator";
import {DeviceType} from "@client/api-client";
import {detectDevice, fingerprintDevice, Fingerprints} from "@model/DeviceDetectModel";

@injectable()
export class AppModel {

    public deviceType: DeviceType

    public deviceFingerPrint: Fingerprints;

    @observable
    public isLoading: boolean = false;

    constructor() {
        this.deviceType = detectDevice();
        this.fingerprint();
    }

    private fingerprint = flow(function* () {
        this.deviceFingerPrint = yield fingerprintDevice();
    });
}
