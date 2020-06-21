import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
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
                <Title>{<FormattedMessage id="com.makeit.web.page.create.project"/>}</Title>
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
                                    <Divider orientation="left">{<FormattedMessage id="com.makeit.web.page.create.project.project.information"/>}</Divider>
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
                                                <Link to="/">Make IT</Link>{<FormattedMessage id="com.makeit.web.page.create.project.project.description"/>}
                                            </p>
                                            <Divider />
                                            <p>
                                                {<FormattedMessage id= "com.makeit.web.page.sign-up.avatar.load.description"/>}<span>
                                                    <a onClick={ev => this.resetLogo(ev)}> reset</a>  {<FormattedMessage id= "com.makeit.web.page.sign-up.avatar.or.load.description"/>}
                                                </span>
                                            </p>
                                        </div>
                                    </Space>
                                    <FormItem
                                        label={<FormattedMessage id="com.makeit.web.page.create.project.project.name"/>}
                                        name="name">
                                        <Input
                                            name="name"
                                            onChange={ev => this.model.name = ev.currentTarget.value} />
                                    </FormItem>
                                    <Space size={20} direction="horizontal" align="end">
                                        <FormItem
                                            label={<FormattedMessage id="com.makeit.web.page.create.project.project.category"/>}
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
                                                    {<FormattedMessage id="com.makeit.web.page.create.project.project.fix.time"/>}
                                                </Checkbox>
                                                <Checkbox
                                                    onChange={ev => this.model.fixedRate = ev.target.checked}
                                                    name="fixedRate">
                                                    {<FormattedMessage id="com.makeit.web.page.create.project.project.fix.rate"/>}
                                                </Checkbox>
                                            </Space>
                                        </FormItem>
                                    </Space>
                                    <Space size={20} direction="horizontal" align="end">
                                        <FormItem
                                            style={{ width: "100%" }}
                                            label={<FormattedMessage id="com.makeit.web.page.create.project.project.tags"/>}
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
                                                    label={<FormattedMessage id="com.makeit.web.page.create.project.min.duration"/>}
                                                    name="minDuration">
                                                    <InputNumber
                                                        onChange={ev => this.model.minDuration = Number(ev.toString())}
                                                        name="minDuration"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                                <FormItem
                                                    label={<FormattedMessage id="com.makeit.web.page.create.project.max.duration"/>}
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
                                                    label={<FormattedMessage id="com.makeit.web.page.create.project.rate.per.hour"/>}
                                                    name="ratePerHour">
                                                    <InputNumber
                                                        onChange={ev => this.model.ratePerHour = Number(ev.toString())}
                                                        name="ratePerHour"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                                <FormItem
                                                    label={<FormattedMessage id="com.makeit.web.page.sign-up.currency"/>}
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
                                                    label={<FormattedMessage id="com.makeit.web.page.create.project.proposal"/>}
                                                    name="proposals">
                                                    <InputNumber
                                                        onChange={ev => this.model.proposals = Number(ev.toString())}
                                                        name="proposals"
                                                        style={{ width: "100%" }} />
                                                </FormItem>
                                                <FormItem
                                                    label={<FormattedMessage id="com.makeit.web.page.create.required.level"/>}
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
                                        label={<FormattedMessage id="com.makeit.web.page.create.required.loe"/>}
                                        name="loe">
                                        <InputNumber
                                            onChange={ev => this.model.loe = Number(ev.toString())}
                                            name="loe"
                                            style={{ width: "calc(25% - 15px)" }} />
                                    </FormItem>
                                    <Divider orientation="left">{<FormattedMessage id="com.makeit.web.page.create.project.description"/>}</Divider>
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
                                                   {<FormattedMessage id="com.makeit.web.page.create.description1"/>}
                                                <br />
                                                    {<FormattedMessage id="com.makeit.web.page.create.description2"/>}
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
