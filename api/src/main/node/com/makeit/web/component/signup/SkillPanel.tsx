import * as React from "react";
import { observer } from "mobx-react";
import { injectIntl } from "react-intl";

import { Formik } from "formik";
import { Form, Select, Input } from "formik-antd";
import { Form as AntForm, Button, Divider, Empty } from "antd";

import { SkillSelection, Selection } from "@component/shared/SkillSelection";
import { SkillModel } from "@model/SkillModel";
import { SkillModule } from "@ioc/SkillModule";
import { module, resolve } from "@ioc/app-module-decorator";

const categories = [
    {
        id: 1,
        name: "Web Dev"
    },
    {
        id: 2,
        name: "Mobile Dev"
    },
    {
        id: 3,
        name: "UI & UX"
    },
    {
        id: 4,
        name: "Devops & Administration"
    },
    {
        id: 5,
        name: "Customer Service"
    },
    {
        id: 6,
        name: "Marketing"
    }
]

const SkillCategorySelect = (props: { onChange: (val: any) => void }) => (
    <Select
        name="skill-category"
        placeholder="Please select category"
        onChange={val => props.onChange(val)}
        style={{ width: 200 }}>
        {
            categories.map((category, it) => <Select.Option key={it} value={category.id}>{category.name}</Select.Option>)
        }
    </Select>
);

@module(SkillModule) @observer
class SkillPanel extends React.Component {

    @resolve
    private model: SkillModel;

    private handleCategoryChange(category: number) {
        if (this.model.category !== category) {
            this.model.skills.forEach(skill => {
                skill.category = category;
                skill.skill = null;
                skill.experience = null;
            });
        }
        this.model.category = category;
    }

    private handleSelectionRemove(removeFn: Function, index: number) {
        const selection = this.model.skills.splice(index, 1)[0];
        this.model.errors.splice(index, 1);
        removeFn(index);

        if (selection) {
            this.validateSkills(index);
        }
        this.forceUpdate();
    }

    private handleSelectionChange(selection: Selection, index: number) {
        this.model.skills[index] = selection;
        this.model.errors[index] = selection.experience ? "success" : "warning";

        this.validateSkills(index);
        this.forceUpdate();
    }

    private validateSkills(index: number) {
        const dupes = {};
        this.model.skills.forEach((item, it) => {
            if (item.skill) {
                dupes[item.skill.id] = dupes[item.skill.id] || [];
                dupes[item.skill.id].push(it);
            }
        });

        for (const id in dupes) {
            const arr = dupes[id];
            if (arr.length > 1) {
                arr.forEach(it => {
                    if (it !== index) {
                        this.model.errors[it] = "error";
                    }
                });
            }
            else {
                const it = arr[0];
                const { experience } = this.model.skills[it];
                this.model.errors[it] = experience ? "success" : "warning";
            }
        }
    }

    public render() {
        return <>
            <Formik
                initialValues={this.model}
                onSubmit={() => {/* @ts-ignore */ }}
                render={() => (
                    <Form layout="vertical" className="signup-form skills-form">
                        <Divider orientation="left">Professional Skills</Divider>
                        <p>
                            Please enter your top skills regarding to the category you choose.
                            That will help to find out the best job you are matched with.
                            Add your experience to each skill, the average skill level will represent you in our system.
                        </p>
                        <p>
                            No more than 10 skills should be selected. No worry about those skills,
                            you can update the selected set whatever you like,
                            also you are able to update the experience level when you thought it has grown.
                        </p>
                        <AntForm.Item>
                            <Divider orientation="left">
                                <SkillCategorySelect onChange={val => this.handleCategoryChange(val)} />
                            </Divider>
                        </AntForm.Item>
                        <AntForm.List name="skills">
                            {
                                (fields, { add, remove }) => <>
                                    {
                                        fields.length == 0
                                            ? <Empty description={
                                                <span style={{ color: "#aeb8c2" }}>No skills selected, please select skill category before</span>} />
                                            : null
                                    }
                                    {
                                        fields.map((field, index) => (
                                            <AntForm.Item
                                                hasFeedback={!!this.model.errors[index]}
                                                validateStatus={this.model.errors[index] || ""}
                                                name={`skills[${index}]`}
                                                key={`skills[${index}]`}>
                                                <>
                                                    <Input hidden={true} name={`skills[${index}]`} value={index} />
                                                    <SkillSelection
                                                        key={`skill-selection[${index}]`}
                                                        category={this.model.category}
                                                        onSelectionChange={(sel) => this.handleSelectionChange(sel, index)}
                                                        remove={
                                                            fields.length === index + 1
                                                                ? () => this.handleSelectionRemove(remove, field.name)
                                                                : null
                                                        } />
                                                </>
                                            </AntForm.Item>
                                        ))
                                    }
                                    <AntForm.Item>
                                        <Button
                                            disabled={this.model.category < 0}
                                            type="default" style={{ width: 200 }} onClick={() => add()}>Add your skill</Button>
                                        <Button type="link">Add skill category</Button>
                                    </AntForm.Item>
                                </>
                            }
                        </AntForm.List>
                    </Form>
                )} />
        </>
    }
}

export default injectIntl(SkillPanel);
