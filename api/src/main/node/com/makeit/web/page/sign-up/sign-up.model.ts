import { inject, injectable } from "inversify";

import { AppModel } from "@page/app-layout/app-layout.model";
import { AxiosAuthenticationClient } from "@client/api-client";

@injectable()
export class SignUpModel {
    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosAuthenticationClient) private client: AxiosAuthenticationClient
    ) {
    }
}
