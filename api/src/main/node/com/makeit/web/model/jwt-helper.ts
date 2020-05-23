import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class JwtHelper {

    public decodeToken(token: string = "") {
        if (token === null || token === "") {
            return {"upn": ""};
        }
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("JWT must have 3 parts");
        }

        const decoded = JwtHelper.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token");
        }

        return JSON.parse(decoded);
    }


    private static urlBase64Decode(str: string) {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
        // @formatter:off
        switch (output.length % 4) {
            case 0: break;
            case 2: output += "=="; break;
            case 3: output += "=";  break;
            default: throw new Error("Illegal base64url string!");
        }
        // @formatter:on
        return decodeURIComponent(window.escape(window.atob(output)));
    }
}
