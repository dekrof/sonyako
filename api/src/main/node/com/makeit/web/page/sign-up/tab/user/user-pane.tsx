import * as React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";

import Avatars from "@dicebear/avatars";
import { Formik } from "formik";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { Divider, message, Space, Tooltip, Upload } from "antd";
import { DatePicker, Form, FormItem, Input, Select } from "formik-antd";

import { context, observer, resolve } from "@page/decorator";
import { Gender, UserModel, UserModule } from "@page/sign-up/tab/user";

function getBase64(img: Blob | any, callback: Function) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
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

const AVATAR_SIZE = 120;

const avatarOptions = {
    base64: true,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    background: "#f3f3f3"
};

const avatarRef = React.createRef<HTMLImageElement>();

const AvatarImage = (props: { src: string }) => (
    <div>
        <img ref={avatarRef} width={AVATAR_SIZE} height={AVATAR_SIZE} src={props.src}/>
    </div>
);

const UploadButton = (props: { loading: boolean; avatarUrl: string }) => (
    <div>
        <AvatarImage src={props.avatarUrl}/>
    </div>
);

const FormLabel = (props: { label: string; message: string }) => (
    <span>
        <FormattedMessage id={props.label} defaultMessage={props.label}/>
        &nbsp;
        <Tooltip
            style={{left: 20}}
            title={<span dangerouslySetInnerHTML={{__html: props.message}}/>}>
            <QuestionCircleTwoTone twoToneColor="#9a2c80"/>
        </Tooltip>
    </span>
);

@context(UserModule) @observer
class UserPanel extends React.Component<WrappedComponentProps> {

    @resolve
    private model: UserModel;

    private handleChange = info => {
        if (info.file.status === "uploading") {
            this.model.loading = true;
            return;
        }

        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, avatarUrl => {
                this.model.avatarUrl = avatarUrl;
                this.model.loading = false;
            });
        }
    };

    private resetAvatar(ev: React.MouseEvent) {
        ev.preventDefault();
        const {gender, username} = this.model;

        // force to update;
        this.model.loading = true;
        this.model.avatarUrl = new Avatars(Gender.getSprites(gender), avatarOptions).create(username);
        this.model.loading = false;
    }

    public render() {
        const t = (key: string) => this.props.intl.formatMessage({id: key});
        const {avatarUrl, username, loading, gender} = this.model;

        const hasSvgAvatar = Boolean(avatarUrl && avatarUrl.indexOf("image/svg") > 0);

        this.model.avatarUrl = hasSvgAvatar || !avatarUrl
            ? new Avatars(Gender.getSprites(gender), avatarOptions).create(username || "makeit-avatars-seed-sdf")
            : avatarUrl;

        return <>
            <Formik
                initialValues={this.model}
                onSubmit={(form) => {
                    console.log(form)
                }}
                render={() => (
                    <Form layout="vertical" className="signup-form">
                        <Divider orientation="left">Contact Information</Divider>
                        <Space direction="horizontal" align="start" size={20} className="signup-form-avatar-space">
                            <div className="signup-form-user-avatar">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="ant-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}>
                                    <UploadButton loading={loading} avatarUrl={this.model.avatarUrl}/>
                                </Upload>
                            </div>
                            <div>
                                <p>
                                    <Link to="/">Make IT</Link> doing the best to provide a quality avatar picture for
                                    your profile.
                                    Every time, while you entering the new username the new unique avatar will be
                                    immediately ready for your choice.
                                </p>
                                <Divider/>
                                <p>
                                    Click on picture to upload your own avatar, or <span>
                                        <a onClick={ev => this.resetAvatar(ev)}>
                                            reset
                                        </a> to generate a new one.
                                    </span>
                                </p>
                            </div>
                        </Space>
                        <FormItem
                            name="username"
                            label={
                                <FormLabel
                                    label={t("login.username")}
                                    message={
                                        `The username should have length between 6 and 12 symbols,
                                        without special characters and <b>@</b> symbol`
                                    }/>
                            }>
                            <Input
                                style={{width: "calc(50% - 10px)"}}
                                name="username"
                                placeholder={t("login.username.placeholder")}
                                onChange={ev => this.model.username = ev.currentTarget.value}/>
                        </FormItem>

                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="primaryPassword"
                                label={
                                    <FormLabel
                                        label="Password"
                                        message={
                                            `Password should contains at least 2 uppercase letters and digits and not have size less than 8 symbols.
                                            <hr/>
                                            <table>
                                                <tr>
                                                    <td>Good</td>
                                                    <td>BigBear4591</td>
                                                </tr>
                                                <tr>
                                                    <td>Bad</td>
                                                    <td><s>qwerty12345</s></td>
                                                </tr>
                                            </table>`
                                        }/>
                                }>
                                <Input.Password
                                    name="primaryPassword"
                                    placeholder="Please enter your password"/>
                            </FormItem>
                            <FormItem
                                name="confirmPassword"
                                label="Confirm Password">
                                <Input.Password
                                    name="confirmPassword"
                                    placeholder="Type password again to confirm"/>
                            </FormItem>
                        </Space>

                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="email"
                                label="E-mail">
                                <Input
                                    name="email"
                                    placeholder="Enter your e-mail"/>
                            </FormItem>
                            <FormItem
                                name="phoneNumber"
                                label={
                                    <FormLabel
                                        label="Phone number"
                                        message={
                                            `The phone number should contains 11 or 13 digits regarding to your operator
                                            and includes the country code.
                                            <hr />
                                            <b>Preferable format</b>: +38 (066) 123-45-67`
                                        }/>
                                }>
                                <Input
                                    name="phoneNumber"
                                    placeholder="Enter your phone number"/>
                            </FormItem>
                        </Space>

                        <Divider orientation="left">Personal Information</Divider>
                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="name"
                                label="First Name">
                                <Input name="name"/>
                            </FormItem>
                            <FormItem
                                name="surname"
                                label="Last Name">
                                <Input name="surname"/>
                            </FormItem>
                        </Space>

                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="gender"
                                label="Gender">
                                <Select
                                    name="gender"
                                    placeholder="Please select your gender"
                                    defaultValue={this.model.gender}
                                    onSelect={(_ev, el) => this.model.gender = el.value}>
                                    <Select.Option value={Gender.MALE}>Male</Select.Option>
                                    <Select.Option value={Gender.FEMALE}>Female</Select.Option>
                                    <Select.Option value={Gender.HUMAN}>Human</Select.Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                name="birthday"
                                label="Birthday">
                                <DatePicker name="birthday" showTime={false} style={{width: "100%"}}/>
                            </FormItem>
                        </Space>
                    </Form>
                )
                }/>
        </>;
    }
}

export default injectIntl(UserPanel);
