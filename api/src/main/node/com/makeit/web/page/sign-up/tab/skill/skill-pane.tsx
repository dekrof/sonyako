import * as React from "react";
import { injectIntl, WrappedComponentProps } from 'react-intl';

import { Formik } from "formik";
import { Form, Select } from "formik-antd";
import { Button, Divider, Empty, Form as AntForm, Tabs } from "antd";

import { Selection, SkillSelection } from "@component/skill/skill-selection";
import { SkillModule, SkillModel, SkillTabModel, Icons } from "@page/sign-up/tab/skill";
import { context, observer, resolve, observable } from "@page/decorator";

type SkillTabOption = {
    key: string;
    title: string | React.ReactNode;
    content: string | React.ReactNode;
}

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
        style={{ width: 260 }}>
        {
            categories.map((category, it) => <Select.Option
                key={it}
                value={category.id}>{category.name}</Select.Option>
            )
        }
    </Select>
);

interface SkillTabProps extends WrappedComponentProps {
    key?: string;
    category: number;
    onModelChange: (model: SkillTabModel) => void;
}

@observer
class SkillTab extends React.Component<SkillTabProps> {

    @resolve("Factory<SkillTabModel>")
    private factory: (category: number) => SkillTabModel;

    private model: SkillTabModel;

    public render() {
        this.model = this.model || this.factory(this.props.category);
        const { errors, category } = this.model;

        return (
            <>
                <AntForm.List key={this.props.key} name={`skills-category-${category}`}>
                    {
                        (fields, { add, remove }) => <>
                            {
                                fields.length == 0
                                    ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                                        <span
                                            style={{ color: "#aeb8c2" }}>No skills selected, please select skill category before</span>} />
                                    : null
                            }
                            {
                                fields.map((field, index) => (
                                    <AntForm.Item
                                        hasFeedback={!!errors[index]}
                                        validateStatus={errors[index] || ""}
                                        name={`skills[${index}]`}
                                        key={`skills[${index}]`}>
                                        <>
                                            <SkillSelection
                                                key={`skill-selection[${index}]`}
                                                category={category}
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
                                <Button disabled={category < 0} type="default" style={{ width: 200 }} onClick={() => add()}>
                                    Add your skill
                                </Button>
                            </AntForm.Item>
                        </>
                    }
                </AntForm.List>
            </>
        );
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
            } else {
                const it = arr[0];
                const { experience } = this.model.skills[it];
                this.model.errors[it] = experience ? "success" : "warning";
            }
        }
        this.props.onModelChange(this.model);
    }
}

const SkillTabIntl = injectIntl(SkillTab);

@observer
class SkillPanel extends React.Component {

    @resolve
    private model: SkillModel;

    @observable
    private activeKey: string;

    @observable
    private categories: Set<number> = new Set();

    @observable
    private skillTabs: SkillTabOption[] = [];

    public render() {

        return <>
            <Formik
                initialValues={{}}
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
                        <Divider dashed />
                        <Tabs
                            hideAdd
                            activeKey={this.activeKey}
                            size="small"
                            type="editable-card"
                            onTabClick={(tab: string) => this.selectSkillTab(tab)}
                            tabBarExtraContent={<SkillCategorySelect onChange={val => this.addCategorySkillTab(val)} />}
                            className="skills-form-tabs">
                            {
                                this.skillTabs.map(pane => (
                                    <Tabs.TabPane tab={pane.title} key={pane.key} closable={false}>
                                        {pane.content}
                                    </Tabs.TabPane>
                                ))
                            }
                        </Tabs>
                    </Form>
                )} />
        </>
    }

    private addCategorySkillTab(categoryId: number) {
        const isNewTab = !this.categories.has(categoryId);
        const key = `category-${categoryId}`;

        if (isNewTab) {
            const title = categories.filter(category => category.id === categoryId)[0].name;
            this.categories.add(categoryId);

            this.skillTabs.push({
                key,
                content: <SkillTabIntl
                    category={categoryId} key={`pane-${key}`}
                    onModelChange={(model) => this.handleSkillModelChange(model)}/>,
                title: <span key={`title-${key}`}>
                    <span key={`title-inner-${key}`}>{title}</span>
                    &nbsp;
                    <span key={`title-close-${key}`} onClick={() => this.closeSkillTab(categoryId)}>
                        <Icons.ChipClose width={20} height={20} />
                    </span>
                </span>,
            });
        }

        this.activeKey = key;
    }

    private closeSkillTab(categoryId: number) {
        const skillPane: SkillTabOption = this.skillTabs.filter(it => it.key === `category-${categoryId}`)[0];
        const index = this.skillTabs.indexOf(skillPane);

        this.categories.delete(categoryId);
        this.skillTabs.splice(index, 1);

        const pos = index > 0 && this.skillTabs.length > index
            ? index - 1
            : -1;
        if (pos >= 0) {
            this.activeKey = this.skillTabs[pos].key;
        }
    }

    private selectSkillTab(key: string) {
        this.activeKey = key;
        this.forceUpdate();
    }

    private handleSkillModelChange(model: SkillTabModel) {
        this.model.skills.set(model.category, model);
    }
}

export default injectIntl(SkillPanel);
