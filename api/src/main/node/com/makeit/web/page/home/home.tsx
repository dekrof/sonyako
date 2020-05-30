import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { page, observer } from "@page/decorator";
import { Title } from "@page/app-layout";
import { Pictures } from "@page/home";

import { Typography, Space, Button, Avatar } from "antd";
import { TopDeveloperCarousel, IncomingProjectCarousel } from "@component/home";

import "@page/home/home.less";

@page(false) @observer
class HomePage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    render() {
        return (
            <>
                <Title>Home</Title>
                <section className="home">
                    <article className="home-working-together">
                        <div className="home-working-together-title">
                            <Typography.Title>
                                Find quality freelancers and<br />
                                agencies for your<br />
                                development
                            </Typography.Title>
                            <Button type="primary">Get Started</Button>
                        </div>
                        <Pictures.HomeWorkingTogether width={700} />
                    </article>
                    <article className="home-perspectives">
                        <Space size={20} direction="horizontal" align="center">
                            <div className="home-perspectives-head">
                                <Typography.Title>Hire for any scope of work:</Typography.Title>
                            </div>
                            <div className="home-perspectives-item">
                                <Typography.Title>Short-term tasks</Typography.Title>
                                <Typography.Text>Build a pool of diverse experts for one-off tasks</Typography.Text>
                            </div>
                            <div className="home-perspectives-item">
                                <Typography.Title>Recurring projects</Typography.Title>
                                <Typography.Text>Have a go-to team with specialized skills</Typography.Text>
                            </div>
                            <div className="home-perspectives-item">
                                <Typography.Title>Full-time contract work</Typography.Title>
                                <Typography.Text>Expand your staff with a dedicated team</Typography.Text>
                            </div>
                        </Space>
                    </article>
                    <article className="home-top-developers">
                        <Typography.Title>Browse our highest-rated developers</Typography.Title>
                        <TopDeveloperCarousel />
                    </article>
                    <article className="home-how-it-works">
                        <Space size={20} direction="horizontal" align="start">
                            <Space direction="vertical" align="start" className="home-how-it-works-head">
                                <Avatar size={90} shape="circle">
                                    <Pictures.HomePostJob width={70} height={70} />
                                </Avatar>
                                <Typography.Title>Post a job (it’s free)</Typography.Title>
                                <Typography.Text>
                                    Tell us about your project.
                                    Make IT connects you with top talent around the world, or near you.
                                </Typography.Text>
                            </Space>
                            <Space direction="vertical" align="start" className="home-how-it-works-item">
                                <Avatar size={90} shape="circle">
                                    <Pictures.HomeFreelancesComeToYou width={70} height={70} />
                                </Avatar>
                                <Typography.Title>Freelancers come to you</Typography.Title>
                                <Typography.Text>
                                    Get qualified proposals within 24 hours.
                                    Compare bids, reviews, and prior work.
                                    Interview favorites and hire the best fit.
                                </Typography.Text>
                            </Space>
                            <Space direction="vertical" align="start" className="home-how-it-works-item">
                                <Avatar size={90} shape="circle">
                                    <Pictures.HomeCollaborateEasily width={70} height={70} />
                                </Avatar>
                                <Typography.Title>Collaborate easily</Typography.Title>
                                <Typography.Text>
                                    Use Make IT to chat, share files,
                                    and track project milestones from your desktop or mobile.
                                </Typography.Text>
                            </Space>
                            <Space direction="vertical" align="start" className="home-how-it-works-item">
                                <Avatar size={90} shape="circle">
                                    <Pictures.HomePaymentSimplified width={70} height={70} />
                                </Avatar>
                                <Typography.Title>Payment simplified</Typography.Title>
                                <Typography.Text>
                                    Pay hourly or fixed-price and receive invoices through Make IT.
                                    Pay for work you authorize.
                                </Typography.Text>
                            </Space>
                        </Space>
                    </article>
                    <article className="home-incoming-projects">
                        <Typography.Title>Discover incoming projects</Typography.Title>
                        <IncomingProjectCarousel />
                    </article>
                </section>
            </>
        );
    }
}

export default injectIntl(HomePage);
