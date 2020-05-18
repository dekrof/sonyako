import "reflect-metadata";

import * as React from "react";
import { ComponentClass, ComponentType } from "react";

import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { NProgress } from "@tanem/react-nprogress";
import { ProgressBar } from "@component/shared/ProgessBar";
import { ProgressBarContainer } from "@component/shared/ProgressBarContainer";

import { AppModel } from '@model/AppModel';

export interface ConnectedComponent {
    <ComponentConnect extends ComponentType>(component: ComponentConnect): ComponentConnect;
}

export function page(isSecure: boolean = false) {

    return function (Component: ComponentClass) {

        @observer
        class PageComponent extends React.Component<any> {

            @resolve
            private model: AppModel;

            public UNSAFE_componentWillMount() {
                this.model.isLoading = true;
            }

            public componentDidMount() {
                this.model.isLoading = false;
            }

            public render() {
                return (
                    <>
                        <NProgress isAnimating={this.model.isLoading}>
                            {
                                ({ isFinished, progress, animationDuration }) => (
                                    <ProgressBarContainer
                                        isFinished={isFinished}
                                        animationDuration={animationDuration}>
                                        <ProgressBar
                                            progress={progress}
                                            animationDuration={animationDuration} />
                                    </ProgressBarContainer>
                                )
                            }
                        </NProgress>
                        <Component {...this.props} />
                    </>
                );
            }
        }
        return PageComponent;

    } as ConnectedComponent;
}
