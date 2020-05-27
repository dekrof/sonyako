import { PaymentModel } from "@page/sign-up/tab/payment";
import { Context } from "@page/decorator";

export const PaymentModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(PaymentModel).toSelf().inSingletonScope();
    }
}
