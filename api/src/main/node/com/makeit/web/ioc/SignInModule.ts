import { Module } from "@ioc/app-module-decorator";
import { SignInModel } from "@model/SignInModel";

export const SignInModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(SignInModel).toSelf().inSingletonScope();
    }
}
