import { injectable, inject } from "inversify";

import { AxiosUserClient } from "@client/api-client";
import { AppModel } from "@page/app-layout";

@injectable()
export class UserViewModel {

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosUserClient) private userClient: AxiosUserClient
    ) {

    }
}
