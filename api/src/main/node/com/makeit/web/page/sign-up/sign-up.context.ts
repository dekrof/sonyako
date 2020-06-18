import axios from "axios";
import { Context } from "@page/decorator/context-decorator";
import { AxiosAuthenticationClient } from "@client/api-client";

import { SignUpModel } from "@page/sign-up/sign-up.model";

export const SignUpModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(SignUpModel).toSelf().inSingletonScope();
        ctx.bind(AxiosAuthenticationClient).toConstantValue(new AxiosAuthenticationClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
    }
}
