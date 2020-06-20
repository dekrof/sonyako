import * as React from "react";
import { injectIntl } from "react-intl";

import { context, page, observer } from "@page/decorator";
import { Title, Footer } from "@page/app-layout";
import { UserViewModule } from "@page/user-view";

import "@page/user-view/user-view.less";

@page(false) @context(UserViewModule) @observer
class UserView extends React.Component {

    public render() {
        return(
            <>
                <Title>User Profile</Title>
                <section className="user-view">

                </section>
                <Footer/>
            </>
        );
    }
}

export default injectIntl(UserView);
