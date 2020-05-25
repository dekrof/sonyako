import * as React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Avatars from "@dicebear/avatars";
import { Formik } from "formik";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { Divider, message, Space, Tooltip, Upload } from "antd";
import { DatePicker, Form, FormItem, Input, Select } from "formik-antd";
import { FrownOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons"

import { observer, resolve, observable } from "@page/decorator";
import { Gender, UserModel } from "@page/sign-up/tab/user";

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
        <img ref={avatarRef} width={AVATAR_SIZE} height={AVATAR_SIZE} src={props.src} />
    </div>
);

const UploadButton = (props: { loading: boolean; avatarUrl: string }) => (
    <div>
        <AvatarImage src={props.avatarUrl} />
    </div>
);

const FormLabel = (props: { label: string; message: string }) => (
    <span>
        <FormattedMessage id={props.label} defaultMessage={props.label} />
        &nbsp;
        <Tooltip
            style={{ left: 20 }}
            title={<span dangerouslySetInnerHTML={{ __html: props.message }} />}>
            <QuestionCircleTwoTone twoToneColor="#9a2c80" />
        </Tooltip>
    </span>
);

@observer
class UserPanel extends React.Component<WrappedComponentProps> {

    @resolve
    private model: UserModel;

    @observable
    private phoneNumberSuffix: any = <PhoneOutlined />;

    public render() {
        const t = (key: string) => this.props.intl.formatMessage({ id: key });
        const { avatarUrl, username, loading, gender } = this.model;

        const hasSvgAvatar = Boolean(avatarUrl && avatarUrl.indexOf("image/svg") > 0);

        this.model.avatarUrl = hasSvgAvatar || !avatarUrl
            ? new Avatars(Gender.getSprites(gender), avatarOptions).create(username || "makeit-avatars-seed-sdf")
            : avatarUrl;

        return <>
            <Formik
                initialValues={this.model}
                onSubmit={() => { /*@ts-ignore*/ }}
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
                                    <UploadButton loading={loading} avatarUrl={this.model.avatarUrl} />
                                </Upload>
                            </div>
                            <div>
                                <p>
                                    <Link to="/">Make IT</Link> doing the best to provide a quality avatar picture for
                                    your profile.
                                    Every time, while you entering the new username the new unique avatar will be
                                    immediately ready for your choice.
                                </p>
                                <Divider />
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
                            validate={value => this.validateUsername(value)}
                            label={
                                <FormLabel
                                    label={t("login.username")}
                                    message={
                                        `The username should have length between 6 and 12 symbols,
                                        without special characters and <b>@</b> symbol`
                                    } />
                            }>
                            <Input
                                style={{ width: "calc(50% - 10px)" }}
                                name="username"
                                placeholder={t("login.username.placeholder")}
                                onChange={ev => this.model.username = ev.currentTarget.value} />
                        </FormItem>
                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="primaryPassword"
                                validate={value => this.validatePrimaryPassword(value)}
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
                                        } />
                                }>
                                <Input.Password
                                    name="primaryPassword"
                                    onChange={(ev) => this.model.primaryPassword = ev.currentTarget.value}
                                    placeholder="Please enter your password" />
                            </FormItem>
                            <FormItem
                                name="confirmPassword"
                                label="Confirm Password">
                                <Input.Password
                                    name="confirmPassword"
                                    onChange={(ev) => this.model.confirmPassword = ev.currentTarget.value}
                                    placeholder="Type password again to confirm" />
                            </FormItem>
                        </Space>

                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="email"
                                validate={value => this.validateEmail(value)}
                                label="E-mail">
                                <Input
                                    name="email"
                                    suffix={<MailOutlined />}
                                    onChange={(ev) => this.model.email = ev.currentTarget.value}
                                    placeholder="Enter your e-mail" />
                            </FormItem>
                            <FormItem
                                name="phoneNumber"
                                validate={value => this.validatatePhoneNumber(value)}
                                label={
                                    <FormLabel
                                        label="Phone number"
                                        message={
                                            `The phone number should contains 11 or 13 digits regarding to your operator
                                            and includes the country code.
                                            <hr />
                                            <b>Preferable format</b>: +38 (066) 123-45-67`
                                        } />
                                }>
                                <Input
                                    name="phoneNumber"
                                    suffix={this.phoneNumberSuffix}
                                    onChange={(ev) => this.model.phoneNumber = ev.currentTarget.value}
                                    placeholder="Enter your phone number" />
                            </FormItem>
                        </Space>

                        <Divider orientation="left">Personal Information</Divider>
                        <Space direction="horizontal" align="center" size={20}>
                            <FormItem
                                name="name"
                                label="First Name">
                                <Input
                                    name="name"
                                    validate={value => this.validateNames(value, "name")}
                                    onChange={(ev) => this.model.name = ev.currentTarget.value} />
                            </FormItem>
                            <FormItem
                                name="surname"
                                label="Last Name">
                                <Input
                                    name="surname"
                                    validate={value => this.validateNames(value, "last name")}
                                    onChange={(ev) => this.model.surname = ev.currentTarget.value} />
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
                                <DatePicker
                                    name="birthday"
                                    showTime={false}
                                    style={{ width: "100%" }}
                                    disabledDate={(moment) => moment.year() > new Date().getFullYear() - 10}
                                    onChange={(ev) => this.model.birthday = ev.startOf("day").toDate()} />
                            </FormItem>
                        </Space>
                    </Form>
                )
                } />
        </>;
    }

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
        const { gender, username } = this.model;

        // force to update;
        this.model.loading = true;
        this.model.avatarUrl = new Avatars(Gender.getSprites(gender), avatarOptions).create(username);
        this.model.loading = false;
    }

    private validateUsername(value: string) {
        let error: string = null;
        if (!value) {
            error = "Username should not be empty";
        } else if (value.trim().length > 12 || value.trim().length < 6) {
            error = "Username should has length between 6 and 12 symbols inclusively";
        } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/.test(value.trim())) {
            error = "Username should not contains special characters or whitespaces";
        }
        return error;
    }

    private validatePrimaryPassword(value: string) {
        let error: string = null;
        if (!value) {
            error = "Password should not be empty";
        } else if (value.trim().length < 8) {
            error = "Password should has length greater than 8 symbols inclusively";
        } else if (/[!%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/.test(value.trim())) {
            error = "Password contains whitespaces or deined symbols";
        } else if (value.replace(/\D+/g, "").length < 2 || value.replace(/[^A-Z]+/g, "").length < 2) {
            error = "Password should has at least 2 digits and 2 uppercase letters";
        } else if (value.trim() !== this.model.confirmPassword) {
            error = "Password is not confirmed";
        }
        return error;
    }

    private validateEmail(value: string) {
        let error: string = null;
        if (!value) {
            error = "Email should not be empty";
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toLowerCase())) {
            error = "Email address is not valid";
        }
        return error;
    }

    private validatatePhoneNumber(value: string) {
        let error: string = null;
        if (!value) {
            error = "Phone number should not be empty";
            this.phoneNumberSuffix = <FrownOutlined />;
        } else {
            let normalized = value.trim();
            if (value.startsWith("0")) {
                normalized = `+38${value}`;
            } else if (value.charAt(0) !== "+") {
                normalized = `+${value}`;
            }
            const result = parsePhoneNumberFromString(normalized);
            if (!result || !result.isPossible() || !result.isValid()) {
                this.phoneNumberSuffix = <FrownOutlined />;
                error = "Phone number is not valid";
            } else {
                this.phoneNumberSuffix = <span>{result.country || "UA"}</span>;
            }
        }
        return error;
    }

    validateNames(value: string, name: string) {
        let error: string = null;
        if (!value) {
            name = name.replace(/(\b[a-z](?!\s))/g, (char) => char.toUpperCase());
            error = `${name} should not be empty`;
        }
        return error;
    }
}

export default injectIntl(UserPanel);
