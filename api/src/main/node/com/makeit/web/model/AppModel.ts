import { observable } from "mobx";
import { injectable } from "@ioc/app-module-decorator";
import DeviceType from "@model/DeviceDetectModel";

@injectable()
export class AppModel {

    @observable
    public deviceType: DeviceType

    @observable
    public isLoading: boolean = false;

    constructor() {
        this.deviceType = DeviceType.detectDevice();
    }
}
