import * as React from "react";
import { WrappedComponentProps, FormattedMessage, injectIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { page, observer, context, resolve, observable } from '@page/decorator';
import { FormattedHTMLMessage } from "@page/app-layout/lang";
import { HomeModule, Pictures, HomeModel } from '@page/home';
import { Title, Footer } from "@page/app-layout";

import { Typography, Space, Button, Avatar, Drawer, Comment, notification } from 'antd';
import { TopDeveloperCarousel, IncomingProjectCarousel } from "@component/home";

import "@page/home/home.less";
import TextArea from "antd/lib/input/TextArea";

@page(false) @context(HomeModule) @observer
class HomePage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: HomeModel;

    @observable
    private textMessage: string;

    public render() {
        const {activeProject} = this.model;
        return (
            <>
                <Title>
                    <FormattedMessage id="com.makeit.web.page.home.title" />
                </Title>
                <section className="home">
                    <article className="home-working-together">
                        <div className="home-working-together-title">
                            <Typography.Title>
                                <FormattedHTMLMessage id="com.makeit.web.page.home.find-developers" />
                            </Typography.Title>
                            <Button type="primary">
                                <FormattedMessage id="com.makeit.web.page.home.get-started" />
                            </Button>
                        </div>
                        <Pictures.HomeWorkingTogether width={700} />
                    </article>
                    <article className="home-perspectives">
                        <Space size={20} direction="horizontal" align="center">
                            <div className="home-perspectives-head">
                                <Typography.Title>
                                    <FormattedMessage id="com.makeit.web.page.home.perspectives-head" />
                                </Typography.Title>
                            </div>
                            {
                                [0, 1, 2].map((it) => (
                                    <div key={`perspectives-item-${it}`} className="home-perspectives-item">
                                        <Typography.Title>
                                            <FormattedMessage id={`com.makeit.web.page.home.perspectives-items-${it}-head`} />
                                        </Typography.Title>
                                        <Typography.Text>
                                            <FormattedMessage id={`com.makeit.web.page.home.perspectives-items-${it}-text`} />
                                        </Typography.Text>
                                    </div>
                                ))
                            }
                        </Space>
                    </article>
                    <article className="home-top-developers">
                        <Typography.Title>
                            <FormattedMessage id="com.makeit.web.page.home.top-developers" />
                        </Typography.Title>
                        <TopDeveloperCarousel />
                    </article>
                    <article className="home-how-it-works">
                        <Space size={20} direction="horizontal" align="start">
                            {
                                [
                                    Pictures.HomePostJob,
                                    Pictures.HomeFreelancesComeToYou,
                                    Pictures.HomeCollaborateEasily,
                                    Pictures.HomePaymentSimplified
                                ].map((Picture: any, it) => (
                                    <Space
                                        key={`space-${it}`}
                                        direction="vertical"
                                        align="start"
                                        className={`home-how-it-works-${it === 0 ? "head" : "item"}`}>
                                        <Avatar size={90} shape="circle">
                                            <Picture width={70} height={70} />
                                        </Avatar>
                                        <Typography.Title>
                                            <FormattedMessage id={`com.makeit.web.page.home.how-it-works-item-${it}-head`} />
                                        </Typography.Title>
                                        <Typography.Text>
                                            <FormattedHTMLMessage id={`com.makeit.web.page.home.how-it-works-item-${it}-text`} />
                                        </Typography.Text>
                                    </Space>
                                ))
                            }
                        </Space>
                    </article>
                    <article className="home-incoming-projects">
                        <Typography.Title>
                            <FormattedMessage id="com.makeit.web.page.home.incoming-projects" />
                        </Typography.Title>
                        <IncomingProjectCarousel />
                    </article>
                </section>
                <Footer />
                <Drawer
                    closable={false}
                    placement="top"
                    className="contact-owner-drawer"
                    visible={this.model.isCommentDrawerOpen}
                    footer={this.renderDrawerFooter()}>
                        <Comment
                            avatar={<img src={this.model.jwtData?.avatarUrl} />}
                            author={`${this.model.jwtData?.name} ${this.model.jwtData?.surname}`}
                            content={<>
                                <TextArea rows={4} onChange={(ev) => this.textMessage = ev.target.value}/>
                                <p><sub>You writing to {activeProject?.owner.profile.name} {activeProject?.owner.profile.surname}</sub></p>
                            </>}
                        />
                </Drawer>
            </>
        );
    }

    private renderDrawerFooter() {
        return (
            <>
                <Button onClick={() => this.sendMessageToOwner()}>Send Message</Button>
                <a onClick={() => this.closeDrawer()}>Cancel and close</a>
            </>
        );
    }

    private sendMessageToOwner(): void {
        if (!this.model.jwtData) {
            notification.warn({
                message: "Sign-in required",
                description: <span>Only authorized users can leave a comment. Please, <a href="/sign-in">sign-in</a> to continue.</span>,
            });
        } else {
            this.model.sendMessageToOwner(this.textMessage).then(() => {
                this.textMessage = null;
                this.closeDrawer();
            });
        }
    }

    private closeDrawer() {
        this.model.isCommentDrawerOpen = false;
    }
}

export default injectIntl(HomePage);
