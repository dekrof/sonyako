import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { page, observer } from "@page/decorator";
import { Title } from "@page/app-layout";

@page(false) @observer
class HomePage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    render() {
        return (
            <>
                <Title>Home</Title>
                <section className="home">
                    <h1>The best project on Make IT</h1>
                </section>
            </>
        );
    }
}

export default injectIntl(HomePage);
