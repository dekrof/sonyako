import { isMobile, isTablet, isBrowser } from "react-device-detect";

enum DeviceType {
    MOBILE, TABLET, DESKTOP
}

namespace DeviceType {
    export function detectDevice(): DeviceType {
        if (isMobile) {
            return DeviceType.MOBILE;
        }
        if (isTablet) {
            return DeviceType.TABLET;
        }
        if (isBrowser) {
            return DeviceType.DESKTOP;
        }
    }
}

export default DeviceType;
