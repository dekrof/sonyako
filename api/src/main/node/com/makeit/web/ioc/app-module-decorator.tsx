import "reflect-metadata";
import * as React from "react";
import {ComponentClass, ComponentType} from "react";
import {Container, interfaces} from "inversify";
import {Provider} from "inversify-react";

export interface Module {
    bootstrap(container: interfaces.Container): void;
}

export interface ConnectedComponent {
    <ComponentConnect extends ComponentType>(component: ComponentConnect): ComponentConnect;
}

export function module(...modules: Array<Module>) {
    return function (Component: ComponentClass) {
        return class ProviderComponent extends React.Component {

            private readonly _container = new Container({skipBaseClassChecks: true});

            public UNSAFE_componentWillMount(): void {
                modules.forEach((config: Module) => {
                    config.bootstrap(this._container);
                })
            }

            public render() {
                return (
                    <Provider container={this._container}>
                        <Component {...this.props} />
                    </Provider>
                )
            }
        }
    } as ConnectedComponent;
}

export { resolve } from "inversify-react";
export { inject, injectable } from "inversify";
