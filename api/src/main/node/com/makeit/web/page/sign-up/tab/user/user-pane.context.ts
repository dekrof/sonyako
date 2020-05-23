import { Context } from "@page/decorator/context-decorator";
import { UserModel } from "@page/sign-up/tab/user/user-pane.model";

export const UserModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(UserModel).toSelf().inSingletonScope();
    }
}
