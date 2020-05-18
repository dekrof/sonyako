import { Module } from "@ioc/app-module-decorator";
import { UserModel } from "@model/UserModel";

export const UserModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(UserModel).toSelf().inSingletonScope();
    }
}
