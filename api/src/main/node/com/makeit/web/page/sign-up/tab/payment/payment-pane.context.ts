import { Context } from "@page/decorator/context-decorator";
import { PaymentModel } from "@page/sign-up/tab/payment/payment-pane.model";

export const PaymentModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(PaymentModel).toSelf().inSingletonScope();
    }
}
