import "reflect-metadata";

import * as React from "react";
import { ComponentClass, ComponentType } from "react";

import { resolve } from "inversify-react";
import { observer } from "mobx-react";
import { Button, Modal, Space, Typography } from "antd";

import { NProgress } from "@tanem/react-nprogress";
import { ProgressBar } from "@page/app-layout/progress-bar/progess-bar";

import { ProgressBarContainer } from "@page/app-layout/progress-bar/progress-bar-container";
import { AppModel } from "@page/app-layout/app-layout.model";

import Disclaimer from "@svg/disclaimer.svg";

export interface ConnectedPage {
    <ComponentConnect extends ComponentType>(component: ComponentConnect): ComponentConnect;
}

export function page(isSecure: boolean = false) {

    return function (Component: ComponentClass) {

        @observer
        class PageComponent extends React.Component<any> {

            @resolve
            private model: AppModel;

            public UNSAFE_componentWillMount() {
                this.model.isSecure = isSecure;
                this.model.isLoading = true;
            }

            public componentDidMount() {
                this.model.isLoading = false;
            }

            public render() {
                const now = Date.now() / 1000;
                const {jwt, helper} = this.model;
                const isViolated = isSecure && jwt == null || isSecure && helper.decodeToken(jwt.accessToken).exp < now;

                return (
                    <>
                        <NProgress isAnimating={this.model.isLoading}>
                            {
                                ({isFinished, progress, animationDuration}) => (
                                    <ProgressBarContainer
                                        isFinished={isFinished}
                                        animationDuration={animationDuration}>
                                        <ProgressBar
                                            progress={progress}
                                            animationDuration={animationDuration}/>
                                    </ProgressBarContainer>
                                )
                            }
                        </NProgress>
                        {
                            !isViolated ? <Component {...this.props} /> : null
                        }
                        <Modal
                            closable={false}
                            centered={true}
                            transitionName="fade"
                            mask={false}
                            visible={isViolated}
                            title="Unauthorized Access"
                            footer={
                                <Button
                                    onClick={() => this.props.history.push("/sign-in")}
                                    type="primary">Sign Me In</Button>}>
                            <div>
                                <Space align="center" direction="horizontal" size={10}>
                                    <Disclaimer width={90} height={90}/>
                                    <Typography.Paragraph>
                                        You do not have permission to view this resource
                                        using credentials that you supplied.
                                    </Typography.Paragraph>
                                </Space>
                            </div>
                        </Modal>
                    </>
                );
            }
        }

        return PageComponent;

    } as ConnectedPage;
}
