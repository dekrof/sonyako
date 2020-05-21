import * as React from "react";
import { FormattedMessage } from "react-intl";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { IValueWillChange, observable, observe } from "mobx";
import { observer, Provider } from "mobx-react";

import { Avatar, Badge, Button, Drawer, Form, Input, Modal, PageHeader, Radio, Space, Typography } from "antd";
import TopCategoriesMenu from "@component/shared/TopCategoriesMenu";

import { LocaleStore, LocaleSwitcher, MobxIntlProvider } from "@translation/index";
import en from "@translation/locales/en";
import uk from "@translation/locales/uk";
import ru from "@translation/locales/ru";

import { JwtAuthenticationDto } from "@client/api-client";
import { SignInPage, SignUpPage } from "@page/pages";
import { TitleTarget } from "@component/teleport";

import { module, resolve } from "@ioc/app-module-decorator";
import { AppModule } from "@ioc/AppModule";
import { AppModel } from "@model/AppModel";

import SessionExpiration from "@svg/session-expiration.svg";
import UserAnonymous from "@svg/user-anonymous.svg";
import ModalClose from "@svg/modal-close.svg";
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

@module(AppModule) @observer
export default class App extends React.Component {

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
                <MobxIntlProvider>
                    <Router>
                        <main className="app">
                            <PageHeader
                                className="app-header"
                                title={<div className="app-logo"><Link to="/"><span>Make IT</span></Link></div>}
                                subTitle={<TitleTarget/>}
                                extra={this.renderExtraContent()}
                                onBack={() => window.history.back()}/>
                            <TopCategoriesMenu/>
                            <Switch>
                                <Route path={["/", "/sign-in"]} exact component={SignInPage}/>
                                <Route path={["/sign-up", "/sign-up/(user|owner)/:tab?"]} exact
                                       component={SignUpPage}/>
                            </Switch>
                            <Drawer
                                width={520}
                                closable={false}
                                maskClosable={false}
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
                                        <SessionExpiration width={90} height={90}/>
                                        {
                                            this.isSessionShouldBeExtended
                                                ? this.renderExtendSessionForm()
                                                : sessionExpiredSoon
                                        }
                                    </Space>
                                </div>
                            </Modal>
                        </main>
                    </Router>
                </MobxIntlProvider>
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
                    <Button type="primary"><FormattedMessage id="app.header.post-job"/></Button>
                    <LocaleSwitcher/>
                    {
                        !jwt ? null : <div onClick={() => this.isUserDrawerOpen = true}>
                            <Badge showZero={false} count={42} style={{marginRight: 9}}>
                                <Avatar size={32}>
                                    {
                                        !!helper.decodeToken(jwt.accessToken).avatar
                                            ? <img src={helper.decodeToken(jwt.accessToken).avatar} width={32}
                                                   height={32}/>
                                            : <UserAnonymous width={32} height={32}/>
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
                    <ModalClose width={24} height={24}/>
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
}
