import axios from "axios";

import { UserViewModel } from "@page/user-view/user-view.model";
import { AxiosUserClient, AxiosFreelancerClient, AxiosCommentClient } from "@client/api-client";
import { AxiosVisicomClient } from "@client/visicom-client";
import { Context } from "@page/decorator";

export const UserViewModule: Context = {

    bootstrap: (ctx) => {

        ctx.bind<AxiosUserClient>(AxiosUserClient).toConstantValue(new AxiosUserClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosFreelancerClient>(AxiosFreelancerClient).toConstantValue(new AxiosFreelancerClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosCommentClient>(AxiosCommentClient).toConstantValue(new AxiosCommentClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind(AxiosVisicomClient).toSelf().inSingletonScope();
        ctx.bind<UserViewModel>(UserViewModel).toSelf().inSingletonScope();
    }
}
