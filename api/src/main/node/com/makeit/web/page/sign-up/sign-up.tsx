import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { Button, Checkbox, Space, Tabs } from "antd";

import { AddressPanel, Icons, SignUpModule, SignUpModel, SkillPanel, UserPanel, PaymentPanel } from "@page/sign-up";
import { resolve, context, page } from "@page/decorator";
import { Title } from "@page/app-layout";

import { AddressModule } from "@page/sign-up/tab/address";
import { SkillModule } from "@page/sign-up/tab/skill";
import { UserModule } from "@page/sign-up/tab/user";

import "@page/sign-up/sign-up.less";

const TabIcon = (props: { icon: any; title?: string }) => <>
    <div>
        {props.icon}
        <br/>
        <span>{props.title}</span>
    </div>
</>;

@page(false) @context(SignUpModule, UserModule, SkillModule, AddressModule) @observer
class SignUpPage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: SignUpModel;

    public render() {
        const {params} = this.props.match;
        const key = params["0"]
            ? `${params["0"]}-${params["tab"] || "profile"}`
            : "user-profile";

        const t = (key: string) => this.props.intl.formatMessage({id: key});

        return (
            <>
                <section className="signup">
                    <Title>{t("sign-up.title")}</Title>
                    <div className="signup-stack-container">
                        <Tabs tabPosition="right" className="signup-stack-container-tabs" defaultActiveKey={key}>
                            <Tabs.TabPane
                                key="user-profile"
                                tab={<TabIcon icon={<Icons.UserContact width={45} height={45}/>} title="Profile"/>}>
                                <UserPanel/>
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="user-skills"
                                tab={<TabIcon icon={<Icons.UserSkills width={45} height={45}/>} title="Skills"/>}>
                                <SkillPanel/>
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="user-address"
                                tab={<TabIcon icon={<Icons.UserAddress width={45} height={45}/>} title="Address"/>}>
                                <AddressPanel/>
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="user-payment"
                                tab={<TabIcon icon={<Icons.UserPayment width={45} height={45}/>} title="Payment"/>}>
                                <PaymentPanel />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </section>
                <footer className="signup-submit-button-wrapper">
                    <div className="signup-submit-button-wrapper-content">
                        <Space align="center" direction="horizontal" size={20}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width: 126}}
                                onClick={() => this.model.submitRegistration()}>
                                Sign Up
                            </Button>
                            <Checkbox>
                                I agree with <a>Terms and Conditions</a> of <Link to="/">Make IT</Link> company.
                            </Checkbox>
                        </Space>
                    </div>
                </footer>
            </>
        );
    }
}

export default injectIntl(SignUpPage);
