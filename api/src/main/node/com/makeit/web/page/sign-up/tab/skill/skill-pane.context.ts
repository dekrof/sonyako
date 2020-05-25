import { SkillTabModel } from "@page/sign-up/tab/skill";
import { Context } from "@page/decorator";
import { interfaces } from "inversify";

export const SkillModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<interfaces.Factory<SkillTabModel>>("Factory<SkillTabModel>").toFactory<SkillTabModel>((context: interfaces.Context) =>
            (category: number) => {
                return new SkillTabModel(category);
            }
        );
    }
}
