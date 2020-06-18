import { interfaces } from "inversify";
import { create } from "mobx-persist";

import { Context } from "@page/decorator/context-decorator";
import { JwtHelper } from "@model/jwt-helper";
import { AppModel } from "@page/app-layout/app-layout.model";
import { once } from "helpful-decorators";

import { AxiosCategoryClient, AxiosUserClient } from "@client/api-client";
import axios from "axios";

const store = create({storage: localStorage, jsonify: true});

class AppModelHydration {

    @once
    static setupModel(ctx: interfaces.Context) {
        const helper = ctx.container.get(JwtHelper);
        const userClient = ctx.container.get(AxiosUserClient);
        const categoryClient = ctx.container.get(AxiosCategoryClient);
        const model = new AppModel(helper, userClient, categoryClient);
        store("app-model", model);
        return model;
    }
}

export const AppModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<JwtHelper>(JwtHelper).toSelf().inSingletonScope();
        ctx.bind<AppModel>(AppModel).toDynamicValue(ctx => AppModelHydration.setupModel(ctx));
        ctx.bind<AxiosUserClient>(AxiosUserClient).toConstantValue(new AxiosUserClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosCategoryClient>(AxiosCategoryClient).toConstantValue(new AxiosCategoryClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
    }
}
