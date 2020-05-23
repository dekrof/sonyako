import "reflect-metadata";

import * as React from "react";
import { ComponentClass, ComponentType } from "react";
import { Container, interfaces } from "inversify";
import { Provider } from "inversify-react";

export interface Context {
    bootstrap(container: interfaces.Container): void;
}

export interface ConnectedContext {
    <ComponentConnect extends ComponentType>(component: ComponentConnect): ComponentConnect;
}

export function context(...modules: Array<Context>) {
    return function (Component: ComponentClass) {
        return class ProviderComponent extends React.Component {

            private readonly _container = new Container({skipBaseClassChecks: true});

            public UNSAFE_componentWillMount(): void {
                modules.forEach((context: Context) => {
                    context.bootstrap(this._container);
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
    } as ConnectedContext;
}
