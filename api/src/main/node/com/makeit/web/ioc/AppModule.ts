import { interfaces } from "inversify";
import { create } from "mobx-persist";

import { Module } from "@ioc/app-module-decorator";
import { JwtHelper } from "@model/JwtHelper";
import { AppModel } from "@model/AppModel";
import { once } from "helpful-decorators";

const store = create({storage: localStorage, jsonify: true});

class AppModelHydration {

    @once
    static setupModel(ctx: interfaces.Context) {
        const helper = ctx.container.get(JwtHelper);
        const model = new AppModel(helper);
        store("app-model", model);
        return model;
    }
}

export const AppModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(JwtHelper).toSelf().inSingletonScope();
        ctx.bind(AppModel).toDynamicValue(ctx => AppModelHydration.setupModel(ctx));
    }
}
