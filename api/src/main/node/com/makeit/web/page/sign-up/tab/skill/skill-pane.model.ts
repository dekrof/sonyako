import { FormikProps } from "formik";

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


@injectable()
export class SkillModel {

    public form: FormikProps<SkillModel>;

    @observable
    public skills: Map<number, SkillTabModel> = new Map();

    validateSkills() {
        let errors = 0, size = 0;
        let result = null;
        if (this.skills.size > 0) {
            for (const value of this.skills.values()) {
                size += value.skills.length;
            }
            if (size > 10) {
                result = { form: "Only top ten of skills should be selected" };
            }

            this.skills.forEach((model) => {
                errors += model.errors
                    .map((error, it) => error === "error" || error === "warning" ? it : -1)
                    .filter(it => it >= 0).length;

            });
            if (errors > 0) {
                result = { form: "Some skills are not properly defined" };
            }
        }
        return result;
    }
}
