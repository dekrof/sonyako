import { interfaces } from "inversify";
import { create } from "mobx-persist";

import { Context } from "@page/decorator/context-decorator";
import { JwtHelper } from "@model/jwt-helper";
import { AppModel } from "@page/app-layout/app-layout.model";
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

export const AppModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(JwtHelper).toSelf().inSingletonScope();
        ctx.bind(AppModel).toDynamicValue(ctx => AppModelHydration.setupModel(ctx));
    }
}
