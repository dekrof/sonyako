import * as React from "react";
import { WrappedComponentProps, FormattedMessage, injectIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { resolve } from "inversify-react";
import { page, observer, context } from '@page/decorator';
import { FormattedHTMLMessage } from "@page/app-layout/lang";
import { HomeModule, Pictures, HomeModel } from '@page/home';
import { Title, Footer } from "@page/app-layout";

import { Typography, Space, Button, Avatar } from "antd";
import { TopDeveloperCarousel, IncomingProjectCarousel } from "@component/home";

import "@page/home/home.less";

@page(false) @context(HomeModule) @observer
class HomePage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    public render() {
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
            </>
        );
    }
}

export default injectIntl(HomePage);
