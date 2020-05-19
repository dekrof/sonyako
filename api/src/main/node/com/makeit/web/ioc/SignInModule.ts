import axios from "axios";
import {Module} from "@ioc/app-module-decorator";
import {SignInModel} from "@model/SignInModel";
import {AxiosAuthenticationClient} from "@client/api-client";

export const SignInModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(SignInModel).toSelf().inSingletonScope();
        ctx.bind(AxiosAuthenticationClient).toConstantValue(new AxiosAuthenticationClient(
            process.env.API_BASE_URL,
            axios.create()
        ))
    }
}
