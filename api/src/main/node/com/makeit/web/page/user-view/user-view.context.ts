import axios from "axios";

import { UserViewModel } from "@page/user-view/user-view.model";
import { AxiosUserClient } from "@client/api-client";
import { Context } from "@page/decorator";

export const UserViewModule: Context = {

    bootstrap: (ctx) => {
        ctx.bind<AxiosUserClient>(AxiosUserClient).toConstantValue(new AxiosUserClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<UserViewModel>(UserViewModel).toSelf().inSingletonScope();
    }
}
