import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { page, observer } from "@page/decorator";
import { Title } from "@page/app-layout";
import {Pictures} from "@page/home";

import { Typography, Space, Button } from "antd";
import { TopDeveloperCarousel } from "@component/home";

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
                </section>
            </>
        );
    }
}

export default injectIntl(HomePage);
