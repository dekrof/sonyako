import * as React from "react";
import { FormattedMessage } from "react-intl";
import { observer, Provider } from "mobx-react";
import { IValueWillChange, observable, observe } from 'mobx';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { LocaleStore } from "@translation/index";
import en from "@translation/locales/en";
import uk from "@translation/locales/uk";
import ru from "@translation/locales/ru";

import { JwtAuthenticationDto, RoleName, HistoryDto, HistoryType, CommentType, UserStatusType } from '@client/api-client';
import { context, resolve } from "@page/decorator";

import {
    Avatar,
    Button,
    Drawer,
    Form,
    Input,
    Modal,
    notification,
    PageHeader,
    Space,
    Typography,
    Timeline
} from "antd";

import { ClockCircleOutlined } from "@ant-design/icons";

import TimeAgo, { TimeAgoProps } from "timeago-react/lib/timeago-react";
import * as timeago from "timeago.js";
import ukl from "timeago.js/lib/lang/uk";
import rul from "timeago.js/lib/lang/ru";
import enl from "timeago.js/lib/lang/en_US";

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
import { RouteComponentProps } from 'react-router';

timeago.register("uk", ukl);
timeago.register("en", enl);
timeago.register("ru", rul);

const SinceOfTime = (TimeAgo as unknown) as React.Component<TimeAgoProps> & { new(props: TimeAgoProps): React.Component<TimeAgoProps> };


const store = {
    locale: new LocaleStore("uk", { uk, en, ru })
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
                                    subTitle={<TitleTarget />}
                                    extra={this.renderExtraContent()}
                                    onBack={() => window.history.back()} />
                                <TopCategoriesMenu />
                                <Switch>
                                    <Route path={["/"]} exact component={HomePage} />
                                    <Route path={["/sign-in"]} exact component={SignInPage} />
                                    <Route path={["/sign-up", "/sign-up/(user|owner)/:tab?"]} exact component={SignUpPage} />
                                    <Route path={["/email-confirmation"]} exact component={EmailConfirmation} />
                                    <Route path={["/email-verification"]} exact component={EmailVerification} />
                                    <Route path={["/project/create"]} exact component={ProjectCreate} />
                                    <Route path={["/project/view/:id"]} component={ProjectView} />
                                    <Route path={["/profile/view/:id"]} component={UserView} />
                                    <Route path={["/category/:categoryUrl"]} component={CategoryList} />
                                </Switch>
                                <Drawer
                                    width={520}
                                    closable={false}
                                    maskClosable={true}
                                    visible={this.isUserDrawerOpen}
                                    onClose={() => this.isUserDrawerOpen = false}
                                    title={this.renderUserDrawerTitle()}>
                                    <Timeline>
                                        {
                                            this.model.history.map(item => this.renderHistoryTimeline(item))
                                        }
                                    </Timeline>
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
                                            <Icons.SessionExpiration width={90} height={90} />
                                            {
                                                this.isSessionShouldBeExtended
                                                    ? this.renderExtendSessionForm()
                                                    : sessionExpiredSoon
                                            }
                                        </Space>
                                    </div>
                                </Modal>
                            </main>
                            <FooterTarget />
                        </>
                    </Router>
                </LocaleProvider>
            </Provider>
        )
    }

    private renderHistoryTimeline(item: HistoryDto) {
        return (
            <Timeline.Item
                key={Math.random()}
                dot={item.dated ? <ClockCircleOutlined style={{ fontSize: 16, color: "#222" }} /> : null}
            >
                {
                    item.type === HistoryType.COMMENT
                        ? this.renderCommentHistory(item)
                        : this.renderProjectHistory(item)
                }
            </Timeline.Item>
        );
    }

    private renderProjectHistory(item: HistoryDto) {
        const { id, logo: avatarUrl } = item.project;

        const logo =
            <Link to={`/project/view/${id}`} target="blank">
                <img src={avatarUrl} width={40} height={40} style={{ float: "left" }} />
            </Link>
        return (
            <div className="project-history">
                <strong>
                    {item.dated ? <><SinceOfTime datetime={item.createdAt} />,</> : null}
                    {!item.userStatus
                        ? "You created project"
                        : item.userStatus === UserStatusType.HIRE_ME
                            ? "You are hiring on project"
                            : item.userStatus === UserStatusType.HIRED
                                ? "You are hired on project"
                                : "You are declined on project"
                    }
                </strong>
                <div>
                    {logo}
                    <blockquote style={{ marginLeft: 50, height: "" }}>
                        {item.project.name}
                    </blockquote>
                </div>
            </div>
        )
    }

    private renderCommentHistory(item: HistoryDto) {

        if (!item || !item.comment) {
            return null;
        }

        let title = item.commentType === CommentType.PROJECT
            ? "commented in project"
            : "send comment"

        const commentedByUser = item.comment?.commentator?.id === Number(this.model.jwtData.sub);

        const commentator = commentedByUser
            ? "You"
            : `${item.comment?.commentator?.profile.name} ${item.comment?.commentator?.profile.surname}`

        let logo = null;
        if (commentedByUser) {
            if (item.commentType === CommentType.PROJECT) {
                const { id, logo: avatarUrl } = item.belongTo;
                logo =
                    <Link to={`/project/view/${id}`} target="blank">
                        <img src={avatarUrl} width={40} height={40} style={{ float: "left" }} />
                    </Link>
            } else {
                const { id, name, surname, avatarUrl } = item.comment.parent.commentator.profile;
                title += ` to ${name} ${surname}`
                logo =
                    <Link to={`/profile/view/${id}`} target="blank">
                        <img src={avatarUrl} width={40} height={40} style={{ float: "left" }} />
                    </Link>
            }
        } else {
            if (item.commentType === CommentType.PROJECT) {
                const { id, logo: avatarUrl } = item.belongTo;
                logo =
                    <Link to={`/project/view/${id}`} target="blank">
                        <img src={avatarUrl} width={40} height={40} style={{ float: "left" }} />
                    </Link>
            } else {
                const { id, avatarUrl } = item.comment.commentator.profile;
                title += " to you";
                logo =
                    <Link to={`/profile/view/${id}`} target="blank">
                        <img src={avatarUrl} width={40} height={40} style={{ float: "left" }} />
                    </Link>
            }
        }
        return (
            <div className="comment-history">
                <strong>
                    {item.dated ? <SinceOfTime datetime={item.createdAt} /> : null}, {commentator} {title}
                </strong>
                <div>
                    {logo}
                    <blockquote style={{ marginLeft: 50, height: "" }}>
                        {item.comment.description}
                    </blockquote>
                </div>
            </div>
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
                <Form layout="vertical" style={{ width: 385 }}>
                    <Form.Item
                        label="Password"
                        help="Confirm your identity to extend current session">
                        <Input.Password name="password" />
                    </Form.Item>
                </Form>
            </>
        );
    }

    private renderExtraContent() {
        const { jwt, helper } = this.model;
        return (
            <>
                <Space size={24}>
                    <Link to="/sign-in"><FormattedMessage id="app.header.sign-in" /></Link>
                    <Link to="/sign-up"><FormattedMessage id="app.header.sign-up" /></Link>
                    <Button type="primary" onClick={() => this.postJob()}><FormattedMessage id="app.header.post-job" /></Button>
                    <LocaleSwitcher />
                    {
                        !jwt ? null : <div onClick={() => this.isUserDrawerOpen = true}>
                            <Avatar
                                shape="square"
                                style={{ background: "#f0f0f0" }}
                                size={32} src={helper.decodeToken(jwt.accessToken)?.avatarUrl}>
                                {
                                    !!helper.decodeToken(jwt.accessToken).avatarUrl
                                        ? null
                                        : <Icons.UserAnonymous width={32} height={32} />
                                }
                            </Avatar>
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
                    style={{ display: "inline", float: "left" }}
                    onClick={() => this.isUserDrawerOpen = false}>
                    <Icons.ModalClose width={24} height={24} />
                </span>
                <Typography.Title>
                    <strong className="title">
                        Your history
                    </strong>
                    <a onClick={() => {
                        localStorage.removeItem("app-model");
                        this.model.jwt = null;
                        this.isUserDrawerOpen = false;
                    }}>Log out</a>
                    <Link to={`/profile/view/${this.model?.jwtData?.sub}`}>Your profile</Link>
                </Typography.Title>
            </div>
        );
    }

    private computeSessionStatus(token: string) {
        const soon = 60 * 1000, now = Date.now();

        let { exp } = this.model.helper.decodeToken(token);
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
        const { jwt, helper } = this.model;

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
