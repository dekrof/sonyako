import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { observer } from "mobx-react";

import Avatars from "@dicebear/avatars";
import human from "@dicebear/avatars-human-sprites";

import { Button, notification } from "antd";
import { Formik } from "formik";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";

import { page } from "@page/app-page-decorator";
import { Title } from "@component/teleport";

import { module, resolve } from "@ioc/app-context";
import { SignInModule } from '@ioc/SignInModule';
import { SignInModel } from "@model/SignInModel";

import Disclaimer from "@svg/disclaimer.svg";
import "@css/login/login-page.less";
import { RouteComponentProps } from "react-router";

const AVATAR_SIZE = 120;

const avatarOptions = {
    base64: true,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    background: "#f3f3f3"
};

const avatarRef = React.createRef<HTMLImageElement>();

const AvatarImage = (props: { src: string; size: number }) => <div className="login-form-avatar">
    <img
        className="login-form-avatar-image"
        ref={avatarRef} width={props.size} height={props.size} src={props.src}/>
</div>;

@page(true) @module(SignInModule) @observer
class SignInPage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: SignInModel;

    private async onSubmit() {
        if (!this.model.isOK) {
            console.log("nothing to login");
        } else {
            const result = await this.model.submitLogin();
            if (!result.success) {
                notification.warning({
                    message: result.data,
                    icon: <Disclaimer width={30} height={30}/>
                });
            } else {
                this.props.history.push("/sign-up");
            }
        }
    }

    private validateUsername = (value: string | null) => {
        return !value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
            ? this.props.intl.formatMessage({id: "login.username.placeholder"})
            : undefined;
    };

    private validatePassword = (value: string | null) => {
        return !value
            ? this.props.intl.formatMessage({id: "login.password.placeholder"})
            : undefined;
    };

    public render() {
        const {username, isOK} = this.model;
        const t = (key: string) => this.props.intl.formatMessage({id: key});
        this.model.avatar = new Avatars(human, avatarOptions).create(username);

        return <section className="login">
            <Title>{t("login.title")}</Title>
            <Formik initialValues={this.model} onSubmit={() => this.onSubmit()} render={() => (
                <Form layout="vertical" className="login-form">
                    <FormItem name="avatar">
                        <AvatarImage src={this.model.avatar} size={AVATAR_SIZE}/>
                    </FormItem>
                    <div hidden={isOK} className="login-form-disclaimer">
                        <Disclaimer height={40}/>
                        <span>{t("login.empty.disclaimer")}</span>
                    </div>
                    <FormItem
                        name="username"
                        label={t("login.username")}
                        validate={value => this.validateUsername(value)}>
                        <Input
                            name="username"
                            placeholder={t("login.username.placeholder")}
                            onChange={ev => this.model.username = ev.currentTarget.value}/>
                    </FormItem>
                    <FormItem
                        name="password"
                        label={t("login.password")}
                        validate={value => this.validatePassword(value)}>
                        <Input.Password
                            name="password"
                            placeholder={t("login.password.placeholder")}
                            onChange={ev => this.model.password = ev.currentTarget.value}/>
                    </FormItem>
                    <FormItem name="controls">
                        <SubmitButton
                            className="login-form-submit-button"
                            type="primary"
                            disabled={false}>{t("login.sign-in")}</SubmitButton>
                    </FormItem>
                    <div className="login-form-newbee-section">
                        <p>
                            <span>{t("login.sign-up.disclaimer")}</span>
                        </p>
                        <Button>{t("login.sign-up")}</Button>
                    </div>
                </Form>
            )}/>
        </section>
    }
}

export default injectIntl(SignInPage);
