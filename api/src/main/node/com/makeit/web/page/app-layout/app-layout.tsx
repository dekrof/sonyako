import * as React from "react";
import { FormattedMessage } from "react-intl";
import { observer, Provider } from "mobx-react";
import { IValueWillChange, observable, observe } from "mobx";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { LocaleStore } from "@translation/index";
import en from "@translation/locales/en";
import uk from "@translation/locales/uk";
import ru from "@translation/locales/ru";

import { JwtAuthenticationDto, RoleName } from "@client/api-client";
import { context, resolve } from "@page/decorator";

import {
    Avatar,
    Badge,
    Button,
    Drawer,
    Form,
    Input,
    Modal,
    notification,
    PageHeader,
    Radio,
    Space,
    Typography
} from "antd";

import {
    AppModel,
    AppModule,
    FooterTarget,
    Icons,
    LocaleProvider,
    LocaleSwitcher,
    TitleTarget,
    TopCategoriesMenu
 } from "@page/app-layout";

import {
    CategoryList,
    EmailConfirmation,
    EmailVerification,
    HomePage,
    ProjectCreate,
    ProjectView,
    SignInPage,
    SignUpPage,
    UserView,
} from "@page/pages";

import "@css/theme.less";

const store = {
    locale: new LocaleStore("uk", {uk, en, ru})
};

enum SessionStatus {
    LIVE, SHOULD_BE_EXTENDED, EXPIRED
}

enum DrawerView {
    TODAY, NOTIFICATION, PREFERENCES
}

const sessionExpiredSoon = <>
    <div>
        <Typography.Paragraph>
            Your session will expire soon and you will be logged out
            automatically. All unsaved data might me lost.
        </Typography.Paragraph>
        <Typography.Text type="warning">Do wish to extend your current session?</Typography.Text>
    </div>
</>;

@context(AppModule) @observer
export default class AppLayout extends React.Component {

    @resolve
    private model: AppModel;

    @observable
    public sessionStatus: SessionStatus = SessionStatus.LIVE;

    @observable
    public isSessionShouldBeExtended: boolean = false;

    @observable
    private isUserDrawerOpen: boolean = false;

    public componentDidMount() {
        observe(this.model, "jwt", (ev: IValueWillChange<JwtAuthenticationDto>) => {
            if (ev.newValue) {
                this.computeSessionStatus(ev.newValue.accessToken);
            }
        });
    }

    public render() {
        return (
            <Provider {...store}>
                <LocaleProvider>
                    <Router>
                        <>
                            <main className="app">
                                <PageHeader
                                    className="app-header"
                                    title={<div className="app-logo"><Link to="/"><span>Make IT</span></Link></div>}
                                    subTitle={<TitleTarget/>}
                                    extra={this.renderExtraContent()}
                                    onBack={() => window.history.back()}/>
                                <TopCategoriesMenu/>
                                <Switch>
                                    <Route path={["/"]} exact component={HomePage}/>
                                    <Route path={["/sign-in"]} exact component={SignInPage}/>
                                    <Route path={["/sign-up", "/sign-up/(user|owner)/:tab?"]} exact component={SignUpPage}/>
                                    <Route path={["/email-confirmation"]} exact component={EmailConfirmation}/>
                                    <Route path={["/email-verification"]} exact component={EmailVerification}/>
                                    <Route path={["/project/create"]} exact component={ProjectCreate}/>
                                    <Route path={["/project/view/:id"]} component={ProjectView}/>
                                    <Route path={["/profile/view/:id"]} component={UserView}/>
                                    <Route path={["/category/:categoryUrl"]} component={CategoryList}/>
                                </Switch>
                                <Drawer
                                    width={520}
                                    closable={false}
                                    maskClosable={true}
                                    visible={this.isUserDrawerOpen}
                                    onClose={() => this.isUserDrawerOpen = false}
                                    title={this.renderUserDrawerTitle()}>
                                    test
                                </Drawer>
                                <Modal
                                    visible={this.model.isSecure && this.sessionStatus != SessionStatus.LIVE}
                                    centered={true}
                                    closable={false}
                                    transitionName="fade"
                                    title="Session Expiration"
                                    footer={this.renderModalFooter()}>
                                    <div>
                                        <Space align="center" direction="horizontal" size={10}>
                                            <Icons.SessionExpiration width={90} height={90}/>
                                            {
                                                this.isSessionShouldBeExtended
                                                    ? this.renderExtendSessionForm()
                                                    : sessionExpiredSoon
                                            }
                                        </Space>
                                    </div>
                                </Modal>
                            </main>
                            <FooterTarget/>
                        </>
                    </Router>
                </LocaleProvider>
            </Provider>
        )
    }

    private renderModalFooter(): React.ReactNode {
        return (
            <>
                <Button onClick={() => location.href = "/"}>Cancel</Button>
                <Button onClick={() => this.isSessionShouldBeExtended = true} type="primary">Proceed</Button>
            </>
        );
    }

    private renderExtendSessionForm() {
        return (
            <>
                <Form layout="vertical" style={{width: 385}}>
                    <Form.Item
                        label="Password"
                        help="Confirm your identity to extend current session">
                        <Input.Password name="password"/>
                    </Form.Item>
                </Form>
            </>
        );
    }

    private renderExtraContent() {
        const {jwt, helper} = this.model;
        return (
            <>
                <Space size={24}>
                    <Link to="/sign-in"><FormattedMessage id="app.header.sign-in"/></Link>
                    <Link to="/sign-up"><FormattedMessage id="app.header.sign-up"/></Link>
                    <Button type="primary" onClick={() => this.postJob()}><FormattedMessage id="app.header.post-job"/></Button>
                    <LocaleSwitcher/>
                    {
                        !jwt ? null : <div onClick={() => this.isUserDrawerOpen = true}>
                            <Badge showZero={false} count={42} style={{marginRight: 9}}>
                                <Avatar
                                    style={{background: "#f0f0f0"}}
                                    size={32} src={helper.decodeToken(jwt.accessToken)?.avatarUrl}>
                                    {
                                        !!helper.decodeToken(jwt.accessToken).avatarUrl
                                            ? null
                                            : <Icons.UserAnonymous width={32} height={32}/>
                                    }
                                </Avatar>
                            </Badge>
                        </div>
                    }
                </Space>
            </>
        );
    }

    private renderUserDrawerTitle() {
        return (
            <div>
                <span
                    style={{display: "inline", float: "left"}}
                    onClick={() => this.isUserDrawerOpen = false}>
                    <Icons.ModalClose width={24} height={24}/>
                </span>
                <Radio.Group defaultValue={DrawerView.TODAY}>
                    <Radio.Button value={DrawerView.TODAY}>Today</Radio.Button>
                    <Radio.Button value={DrawerView.NOTIFICATION}>Notification</Radio.Button>
                    <Radio.Button value={DrawerView.PREFERENCES}>Preferences</Radio.Button>
                </Radio.Group>
            </div>
        );
    }

    private computeSessionStatus(token: string) {
        const soon = 60 * 1000, now = Date.now();

        let {exp} = this.model.helper.decodeToken(token);
        exp = exp * 1000;

        if (now >= exp) {
            this.sessionStatus = SessionStatus.EXPIRED;
            this.model.jwt = null;
            return;
        }

        if (exp - now <= soon && exp - now >= 0) {
            this.sessionStatus = SessionStatus.SHOULD_BE_EXTENDED;
            return;
        }

        this.sessionStatus = SessionStatus.LIVE;
        const timeout = setTimeout(() => {
            this.sessionStatus = SessionStatus.SHOULD_BE_EXTENDED;
            clearTimeout(timeout);
        }, exp - now - soon);
    }

    private async postJob() {
        const {jwt, helper} = this.model;

        if (!jwt) {
            notification.warn({
                message: "Sign-in required",
                description: <span>Only authorized clients can post a job. Please, <a href="/sign-in">sign-in</a> to continue.</span>,
            });
            return;
        }
        const user = await this.model.getUser();
        const role = user.roles.find(role => role.roleName == RoleName.ROLE_OWNER);
        if (role) {
            window.location.href = "/project/create";
        }
    }
}
