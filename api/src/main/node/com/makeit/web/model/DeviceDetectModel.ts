import { isAndroid, isBrowser, isIOS } from "react-device-detect";
import { DeviceType } from "@client/api-client";
import * as Fingerprint from "fingerprintjs2";

const excludes = [
    "webdriver",
    "indexedDb",
    "fonts",
    "fontsFlash",
    "sessionStorage",
    "localStorage",
    "openDatabase",
    "addBehavior",
    "plugins",
    "doNotTrack",
    "hasLiedLanguages",
    "hasLiedResolution",
    "hasLiedOs",
    "hasLiedBrowser",
    "adBlock",
    "cpuClass",
    "webgl",
    "canvas"
]

export type FingerprintKey = "userAgent"
    | "language"
    | "colorDepth"
    | "deviceMemory"
    | "hardwareConcurrency"
    | "screenResolution"
    | "availableScreenResolution"
    | "timezoneOffset"
    | "timezone"
    | "platform"
    | "webglVendorAndRenderer"
    | "touchSupport"
    | "audio";

const hidden = Symbol();

class Options {

    private [hidden] = {};

    get excludes() {
        for (const exclude of excludes) {
            this[hidden][exclude] = true;
        }
        return this[hidden];
    }

    set excludes(components: any) {
        this[hidden] = components;
    }
}

export class Fingerprints {

    constructor(private components: { [key: string]: {} }[]) {
    }

    public get(key: FingerprintKey): any {
        return this.components.filter(component => component.key === key)[0].value;
    }

    public encode() {
        const objJsonStr = JSON.stringify(this.components);
        return btoa(objJsonStr);
    }

    static decode(hash: string) {
        return new Fingerprints(JSON.parse(atob(hash)));
    }
}

async function fingerprintDevice(): Promise<Fingerprints> {
    return new Promise<Fingerprints>((resolve, reject) => {
        try {
            const closer = setTimeout(() => Fingerprint.get(new Options, (components) => {
                resolve(new Fingerprints(components));
                clearInterval(closer);
            }), 500);
        } catch (ex) {
            reject(ex);
        }
    });
}

function detectDevice(): DeviceType {
    if (isAndroid) {
        return DeviceType.DEVICE_TYPE_ANDROID;
    }
    if (isIOS) {
        return DeviceType.DEVICE_TYPE_IOS;
    }
    if (isBrowser) {
        return DeviceType.DEVICE_TYPE_PC_BOX;
    }
}

export { fingerprintDevice, detectDevice };

