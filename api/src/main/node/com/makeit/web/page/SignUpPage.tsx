import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { observer } from "mobx-react";

import { Tabs } from "antd";
import { AddressPanel, SkillPanel, UserPanel } from "@component/signup";
import { Title } from "@component/teleport";
import { page } from "@page/app-page-decorator";

import UserContact from "@svg/user-contact.svg";
import UserAddress from "@svg/user-address.svg";
import UserPayment from "@svg/user-payment.svg";
import UserSkills from "@svg/user-skills.svg";
import "@css/signup/signup-page.less";

const TabIcon = (props: { icon: any; title?: string }) => <>
    <div>
        {props.icon}
        <br />
        <span>{props.title}</span>
    </div>
</>;

@page(true) @observer
export class SignUpPage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    public render() {
        const { params } = this.props.match;
        const key = params["0"]
            ?`${params["0"]}-${params["tab"]||"profile"}`
            : "user-profile";

        const t = (key: string) => this.props.intl.formatMessage({ id: key });

        return <section className="signup">
            <Title>{t("sign-up.title")}</Title>
            <div className="signup-stack-container">
                <Tabs tabPosition="right" className="signup-stack-container-tabs" defaultActiveKey={key}>
                    <Tabs.TabPane
                        key="user-profile"
                        tab={<TabIcon icon={<UserContact width={45} height={45} />} title="Profile" />}>
                        <UserPanel />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="user-skills"
                        tab={<TabIcon icon={<UserSkills width={45} height={45} />} title="Skills" />}>
                        <SkillPanel />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="user-address"
                        tab={<TabIcon icon={<UserAddress width={45} height={45} />} title="Address" />}>
                        <AddressPanel />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="user-payment"
                        tab={<TabIcon icon={<UserPayment width={45} height={45} />} title="Payment" />}>
                        Content of Tab 4
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </section>
    }
}

export default injectIntl(SignUpPage);
