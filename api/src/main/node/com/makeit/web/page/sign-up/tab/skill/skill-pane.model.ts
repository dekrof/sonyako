import { ValidateStatus } from "antd/lib/form/FormItem";
import { injectable, observable } from "@page/decorator";
import { Selection } from "@component/skill/SkillSelection";

@injectable()
export class SkillModel {
    @observable
    public category: number = -1;

    @observable
    public skills: Selection[] = [];

    @observable
    public errors: ValidateStatus[] = [];
}
