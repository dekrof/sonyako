import { Module } from "@ioc/app-module-decorator";
import { AppModel } from "@model/AppModel";

export const AppModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(AppModel).toSelf().inSingletonScope();
    }
}
