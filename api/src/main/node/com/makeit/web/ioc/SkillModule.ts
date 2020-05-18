import { Module } from "@ioc/app-module-decorator";
import { SkillModel } from "@model/SkillModel";

export const SkillModule: Module = {
    bootstrap: (ctx) => {
        ctx.bind(SkillModel).toSelf().inSingletonScope();
    }
}
