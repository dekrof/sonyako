import axios from "axios";
import { AxiosAuthenticationClient } from "@client/api-client";

import { SignInModel } from "@page/sign-in";
import { Context } from "@page/decorator";

export const SignInModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(SignInModel).toSelf().inSingletonScope();
        ctx.bind(AxiosAuthenticationClient).toConstantValue(new AxiosAuthenticationClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
    }
}
