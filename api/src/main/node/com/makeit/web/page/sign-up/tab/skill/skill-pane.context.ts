import { Context } from "@page/decorator/context-decorator";
import { SkillModel } from "@page/sign-up/tab/skill/skill-pane.model";

export const SkillModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind(SkillModel).toSelf().inSingletonScope();
    }
}
