import * as React from "react";
import { RouteComponentProps } from "react-router";
import { injectIntl, WrappedComponentProps } from "react-intl";

import Avatars from "@dicebear/avatars";
import human from "@dicebear/avatars-human-sprites";

import { Formik } from "formik";
import { Button, notification } from "antd";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";

import { context, observer, page, resolve } from "@page/decorator";
import { Icons, SignInModel, SignInModule } from "@page/sign-in";
import { Title, Footer } from "@page/app-layout";

import "@page/sign-in/sign-in.less";

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
        ref={avatarRef} width={props.size} height={props.size} src={props.src} />
</div>;

@page(false) @context(SignInModule) @observer
class SignInPage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: SignInModel;

    public render() {
        const { username, isOK } = this.model;
        const t = (key: string) => this.props.intl.formatMessage({ id: key });
        this.model.avatar = new Avatars(human, avatarOptions).create(username || "makeit-avatars-seed-sdf");

        return (
            <>
                <Title>{t("login.title")}</Title>
                <section className="login">
                    <Formik initialValues={this.model} onSubmit={() => this.onSubmit()} render={() => (
                        <Form layout="vertical" className="login-form">
                            <FormItem name="avatar">
                                <AvatarImage src={this.model.avatar} size={AVATAR_SIZE} />
                            </FormItem>
                            <div hidden={isOK} className="login-form-disclaimer">
                                <Icons.Disclaimer height={40} />
                                <span>{t("login.empty.disclaimer")}</span>
                            </div>
                            <FormItem
                                name="username"
                                label={t("login.username")}
                                validate={value => this.validateUsername(value)}>
                                <Input
                                    name="username"
                                    placeholder={t("login.username.placeholder")}
                                    onChange={ev => this.model.username = ev.currentTarget.value} />
                            </FormItem>
                            <FormItem
                                name="password"
                                label={t("login.password")}
                                validate={value => this.validatePassword(value)}>
                                <Input.Password
                                    name="password"
                                    placeholder={t("login.password.placeholder")}
                                    onChange={ev => this.model.password = ev.currentTarget.value} />
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
                                <Button onClick={() => this.props.history.push("/sign-up")}>{t("login.sign-up")}</Button>
                            </div>
                        </Form>
                    )} />
                </section>
                <Footer />
            </>
        )
    }

    private async onSubmit() {
        if (!this.model.isOK) {
            console.log("nothing to login");
        } else {
            const result = await this.model.submitLogin();
            if (!result.success) {
                notification.warning({
                    message: result.data,
                    icon: <Icons.Disclaimer width={30} height={30} />
                });
            } else {
                this.props.history.push("/");
            }
        }
    }

    private validateUsername = (value: string | null) => {
        return !value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
            ? this.props.intl.formatMessage({ id: "login.username.placeholder" })
            : undefined;
    }

    private validatePassword = (value: string | null) => {
        return !value
            ? this.props.intl.formatMessage({ id: "login.password.placeholder" })
            : undefined;
    }
}

export default injectIntl(SignInPage);
