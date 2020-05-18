import { observable } from "mobx";
import { Selection } from "@component/shared/SkillSelection";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { injectable } from "@ioc/app-module-decorator";

@injectable()
export class SkillModel {
    @observable
    public category: number = -1;

    @observable
    public skills: Selection[] = [];

    @observable
    public errors: ValidateStatus[] = [];
}
