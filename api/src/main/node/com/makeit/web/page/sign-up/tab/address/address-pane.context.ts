import { Context } from "@page/decorator/context-decorator";
import { AxiosUkrposhtaClient } from "@client/ukrposhta-client";
import { AxiosVisicomClient } from "@client/visicom-client";
import { AddressModel } from "@page/sign-up/tab/address/address-pane.model";

export const AddressModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(AxiosUkrposhtaClient).toSelf().inSingletonScope();
        ctx.bind(AxiosVisicomClient).toSelf().inSingletonScope();
        ctx.bind(AddressModel).toSelf().inSingletonScope();
    }
}
