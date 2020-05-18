import { Module } from "@ioc/app-module-decorator";
import { AxiosUkrposhtaClient } from "@client/ukrposhta-client";
import { AxiosVisicomClient } from "@client/visicom-client";
import { AddressModel } from "@model/AddressModel";

export const AddressModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(AxiosUkrposhtaClient).toSelf().inSingletonScope();
        ctx.bind(AxiosVisicomClient).toSelf().inSingletonScope();
        ctx.bind(AddressModel).toSelf().inSingletonScope();
    }
}
