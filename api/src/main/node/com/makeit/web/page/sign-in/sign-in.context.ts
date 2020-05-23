import axios from "axios";
import { Context } from "@page/decorator/context-decorator";
import { SignInModel } from "@page/sign-in/sign-in.model";
import { AxiosAuthenticationClient } from "@client/api-client";

export const SignInModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(SignInModel).toSelf().inSingletonScope();
        ctx.bind(AxiosAuthenticationClient).toConstantValue(new AxiosAuthenticationClient(
            process.env.API_BASE_URL,
            axios.create()
        ))
    }
}
