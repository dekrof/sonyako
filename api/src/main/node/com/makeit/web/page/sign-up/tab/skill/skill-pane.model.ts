import { ValidateStatus } from "antd/lib/form/FormItem";
import { Selection } from "@component/skill/skill-selection";
import { injectable, observable } from "@page/decorator";

@injectable()
export class SkillTabModel {

    constructor(category: number) {
        this.category = category;
    }

    @observable
    public category: number = -1;

    @observable
    public skills: Selection[] = [];

    @observable
    public errors: ValidateStatus[] = [];
}
