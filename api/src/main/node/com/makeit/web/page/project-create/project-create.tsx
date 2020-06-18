import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { context, observable, observer, page, resolve } from "@page/decorator";

import Avatars from "@dicebear/avatars";
import jdenticon from "@dicebear/avatars-jdenticon-sprites";

import { intercept } from "mobx";
import { bind } from "helpful-decorators";

import * as showdown from "showdown";
import { Formik } from "formik";
import { Form, FormItem, Input, InputNumber, Select } from "formik-antd";
import { message, Button, Checkbox, Divider, Space, Typography, Upload } from "antd";
import { Code, Extensions, SmartBlock } from "smartblock";

import { Footer, Title } from "@page/app-layout";
import { ProjectCreateModel, ProjectCreateModule } from "@page/project-create";

import "@page/project-create/project-create.less";
import "@css/smart-block.less";
import { CurrencyType } from "@client/api-client";

const extensions = [...Extensions, new Code()];

function getBase64(img: Blob | any, callback: Function) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function logoToBase64(svg: string) {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

const LOGO_SIZE = 120;

const logoOptions = {
    base64: true,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    background: "#f3f3f3"
};

const experiences = [
    {
        level: 1,
        label: "Junior",
    },
    {
        level: 2,
        label: "Low Intermediate",
    },
    {
        level: 3,
        label: "Intermediate",
    },
    {
        level: 4,
        label: "Upper Intermediate",
    },
    {
        level: 5,
        label: "Senior",
    }
];

const logoRef = React.createRef<HTMLImageElement>();

const LogoImage = (props: { src: string }) => (
    <div>
        <img ref={logoRef} width={LOGO_SIZE} height={LOGO_SIZE} src={props.src} />
    </div>
);

const UploadButton = (props: { loading: boolean, logo: string }) => (
    <div>
        <LogoImage src={props.logo} />
    </div>
);

@page(true) @context(ProjectCreateModule) @observer
class ProjectCreate extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: ProjectCreateModel;

    @observable
    private showEditorMenu: boolean = false;

    public componentDidMount() {
        const dispose = intercept(this.model, "id", change => {
            if (!change.newValue) {
                return null;
            }
            setTimeout(() => {
                this.props.history.push(`/project/view/${change.newValue}`);
                dispose();
            }, 10)
            return change;
        });
    }

    public render() {
        const { categories } = this.model;
        const { logo, name, loading } = this.model;

        const hasSvgLogo = Boolean(logo && logo.indexOf("image/svg") > 0);

        this.model.logo = hasSvgLogo || !logo
            ? logoToBase64(new Avatars(jdenticon).create(name || "makeit-project-seed-sdf"))
            : logo;

        return (
            <>
                <Title>Create Project</Title>
                <section className="project-create">
                    <Formik initialValues={this.model} onSubmit={(__, helpers) => helpers.setSubmitting(false)}>
                        {
                            (props) => (
                                <Form layout="vertical" className="project-create-form">
                                    {
                                        (() => {
                                            // the workaround to fix the bag of formik
                                            this.model.form = props;
                                            return null;
                                        })()
                                    }
                                    <Divider type="horizontal" orientation="left">Project Information</Divider>
                                    <Space direction="horizontal" align="start" size={20} className="signup-form-avatar-space">
                                        <div className="signup-form-user-avatar">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="ant-uploader"
                                                showUploadList={false}
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}>
                                                <UploadButton loading={loading} logo={this.model.logo} />
                                            </Upload>
                                        </div>
                                        <div>
                                            <p>
                                                <Link to="/">Make IT</Link> doing the best to provide a quality logo picture for
                                                your project.
                                                Every time, while you entering the new name, the new unique logo will be
                                                immediately ready for your choice.
                                            </p>
                                            <Divider />
                                            <p>
                                                Click on picture to upload your own avatar, or <span>
                                                    <a onClick={ev => this.resetLogo(ev)}>reset</a> to generate a new one.
                                                </span>
                                            </p>
                                        </div>
                                    </Space>
                                    <FormItem
                                        label="Name"
                                        name="name">
                                        <Input
                                            name="name"
                                            onChange={ev => this.model.name = ev.currentTarget.value} />
                                    </FormItem>
                                    <Space size={20} direction="horizontal" align="end">
                                        <FormItem
                                            label="Category"
                                            name="category">
                                            <Select
                                                name="category"
                                                loading={categories.length === 0}
                                                onChange={ev => this.model.category = categories.find(category => category.id === ev)}>
                                                {
                                                    categories.map(category => (
                                                        <Select.Option value={category.id} key={category.id}>{category.name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </FormItem>
                                        <FormItem name="limitation">
                                            <Space size={20} direction="horizontal">
                                                <Checkbox
                                                    onChange={ev => this.model.fixedTime = ev.target.checked}
                                                    name="fixedRate">
                                                    Is this project has fixed rate?
                                                </Checkbox>
                                                <Checkbox
                                                    onChange={ev => this.model.fixedRate = ev.target.checked}
                                                    name="fixedRate">
                                                    Is this project fixed by time?
                                                </Checkbox>
                                            </Space>
                                        </FormItem>
                                    </Space>
                                    <Space size={20} direction="horizontal" align="end">
                                        <FormItem
                                            style={{ width: "100%" }}
                                            label="Tags"
                                            name="tags">
                                            <Select
                                                onChange={ev => this.model.tags = ev}
                                                mode="multiple"
                                                name="tags">
                                                <Select.Option value="Java">Java</Select.Option>
                                                <Select.Option value="Kafka">Kafka</Select.Option>
                                                <Select.Option value="DataDog">DataDog</Select.Option>
                                            </Select>
                                        </FormItem>
                                        <div>
                                            <Space size={20} direction="horizontal">
                                                <FormItem
                                                    label="Min Duration (month)"
                                                    name="minDuration">
                                                    <InputNumber
                                                        onChange={ev => this.model.minDuration = Number(ev.toString())}
                                                        name="minDuration"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                                <FormItem
                                                    label="Max Duration (month)"
                                                    name="maxDuration">
                                                    <InputNumber
                                                        onChange={ev => this.model.maxDuration = Number(ev.toString())}
                                                        name="maxDuration"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                            </Space>
                                        </div>
                                    </Space>
                                    <Space size={0} direction="vertical" align="start" style={{ width: "calc(50% - 10px)" }}>
                                        <div>
                                            <Space size={20} direction="horizontal">
                                                <FormItem
                                                    label="Rate per Hour"
                                                    name="ratePerHour">
                                                    <InputNumber
                                                        onChange={ev => this.model.ratePerHour = Number(ev.toString())}
                                                        name="ratePerHour"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                                <FormItem
                                                    label="Rate Currency"
                                                    name="rateCurrency">
                                                    <Select
                                                        name="rateCurrency"
                                                        style={{ width: "100%" }}
                                                        defaultValue={CurrencyType.UAH}
                                                        onChange={ev => this.model.rateCurrency = ev}>
                                                        <Select.Option value={CurrencyType.USD}>Dollar USA <i>USD | $</i></Select.Option>
                                                        <Select.Option value={CurrencyType.EUR}>Euro <i>EUR | €</i></Select.Option>
                                                        <Select.Option value={CurrencyType.GBP}>Pound sterling <i>GBP | £</i></Select.Option>
                                                        <Select.Option value={CurrencyType.UAH}>Українська Гривня <i>UAH | ₴</i></Select.Option>
                                                    </Select>
                                                </FormItem>
                                            </Space>
                                        </div>
                                        <div>
                                            <Space size={20} direction="horizontal">
                                                <FormItem
                                                    label="Proposals (persons)"
                                                    name="proposals">
                                                    <InputNumber
                                                        onChange={ev => this.model.proposals = Number(ev.toString())}
                                                        name="proposals"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                                <FormItem
                                                    label="Required Level"
                                                    name="requiredLevel">
                                                    <Select
                                                        name="requiredLevel"
                                                        style={{ width: "100%" }}
                                                        defaultValue={3}
                                                        onChange={ev => this.model.requiredLevel = ev}>
                                                            {
                                                                experiences.map((experience) => (
                                                                    <Select.Option key={experience.level} value={experience.level}>
                                                                            {experience.label}
                                                                    </Select.Option>
                                                                ))
                                                            }
                                                    </Select>
                                                </FormItem>
                                            </Space>
                                        </div>
                                    </Space>
                                    <FormItem
                                        label="Level of Effort (hours per week)"
                                        name="loe">
                                        <InputNumber
                                            onChange={ev => this.model.loe = Number(ev.toString())}
                                            name="loe"
                                            style={{ width: "calc(25% - 15px)" }} />
                                    </FormItem>
                                    <Divider type="horizontal" orientation="left">Project Description</Divider>
                                    <FormItem name="description">
                                        <section spellCheck={false} onFocusCapture={() => this.showEditorMenu = true}>
                                            <SmartBlock
                                                showdown={showdown}
                                                outputMarkdown={true}
                                                extensions={extensions}
                                                html={''}
                                                onChange={({ html }) => this.saveEditorOutput(html)}
                                            />
                                            <span className="project-create-description-disclaimer">
                                                <Divider plain dashed />
                                                <Typography.Text type="secondary">
                                                    We user the first paragraph of description to highlight the
                                                    most valuable parts of your project.
                                                <br />
                                                Please, tell us shortly about your project in this paragraph.
                                            </Typography.Text>
                                            </span>
                                        </section>
                                    </FormItem>
                                    <div className="project-create-buttons">
                                        <Button type="primary" onClick={() => this.model.submitProject()}>Create Project</Button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </section>
                <Footer />
            </>
        );
    }

    private saveEditorOutput(html: string) {
        this.model.description = html;
    }

    @bind
    private handleChange(info) {
        this.model.loading = true;
        getBase64(info.file.originFileObj, logo => {
            this.model.logo = logo;
            this.model.loading = false;
        });
        return void 0;
    }

    private resetLogo(ev: React.MouseEvent) {
        ev.preventDefault();
        const { name } = this.model;
        // force to update;
        this.model.loading = true;
        this.model.logo = logoToBase64(new Avatars(jdenticon, logoOptions).create(name));
        this.model.loading = false;
    }
}

export default injectIntl(ProjectCreate);
