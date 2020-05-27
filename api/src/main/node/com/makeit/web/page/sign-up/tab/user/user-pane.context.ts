import { UserModel } from "@page/sign-up/tab/user";
import { Context } from "@page/decorator";

export const UserModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(UserModel).toSelf().inSingletonScope();
    }
}
