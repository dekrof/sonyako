import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import { Button, Checkbox, Space, Tabs, Badge, Popover, List } from "antd";

import { Icons, SignUpModule, SignUpModel } from "@page/sign-up";
import { AddressPanel, SkillPanel, UserPanel, PaymentPanel } from "@page/sign-up";

import { PaymentModule } from "@page/sign-up/tab/payment";
import { AddressModule } from "@page/sign-up/tab/address";
import { SkillModule } from "@page/sign-up/tab/skill";
import { UserModule } from "@page/sign-up/tab/user";
import { Title, Footer } from '@page/app-layout';

import { resolve, context, page } from "@page/decorator";

import "@page/sign-up/sign-up.less";

const TabIcon = (props: { icon?: any; title?: string; errors?: any; showErrors?: boolean; }) => (<>
    <div>
        {
            !props.showErrors ? null : <Popover
                title="Errors"
                placement="bottom"
                content={
                    <List
                        size="small"
                        bordered={false}
                        dataSource={Object.values(props.errors || {})}
                        renderItem={(item, it) => (
                            <List.Item>{it + 1}.&nbsp;{item}</List.Item>
                        )}
                    />
                }>
                <Badge count={Object.getOwnPropertyNames(props.errors).length} showZero={false}>
                    <i />
                </Badge>
            </Popover>
        }
        {
            props.icon
        }
        <br />
        <span>{props.title}</span>
    </div>
</>);

@page(false)
@context(PaymentModule, SignUpModule, UserModule, SkillModule, AddressModule)
@observer
class SignUpPage extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: SignUpModel;

    public render() {
        const { params } = this.props.match;
        const key = params["0"]
            ? `${params["0"]}-${params["tab"] || "profile"}`
            : "user-profile";

        const t = (key: string) => this.props.intl.formatMessage({ id: key });

        const { profileErrors, hasProfileErrors } = this.model;
        const { addressErrors, hasAddressErrors } = this.model;
        const { paymentErrors, hasPaymentErrors } = this.model;
        const { skillErrors, hasSkillErrors } = this.model;

        return (
            <>
                <section className="signup">
                    <Title>{t("sign-up.title")}</Title>
                    <div className="signup-stack-container">
                        <Tabs tabPosition="right" className="signup-stack-container-tabs" defaultActiveKey={key}>
                            <Tabs.TabPane
                                key="user-profile"
                                tab={<TabIcon
                                    errors={profileErrors}
                                    showErrors={hasProfileErrors}
                                    icon={<Icons.UserContact width={45} height={45} />}
                                    title={t("sign-up.profile")} />}>
                                <UserPanel />
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="user-address"
                                tab={<TabIcon
                                    errors={addressErrors}
                                    showErrors={hasAddressErrors}
                                    icon={<Icons.UserAddress width={45} height={45} />}
                                    title={t("sign-up.address")} />}>
                                <AddressPanel />
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="user-payment"
                                tab={<TabIcon
                                    errors={paymentErrors}
                                    showErrors={hasPaymentErrors}
                                    icon={<Icons.UserPayment width={45} height={45} />}
                                    title={t("sign-up.payment")} />}>
                                <PaymentPanel />
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="user-skills"
                                tab={<TabIcon
                                    errors={skillErrors}
                                    showErrors={hasSkillErrors}
                                    icon={<Icons.UserSkills width={45} height={45} />}
                                    title={t("sign-up.skills")} />}>
                                <SkillPanel />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </section>
                <div className="signup-submit-button-wrapper">
                        <div className="signup-submit-button-wrapper-content">
                            <Space align="center" direction="horizontal" size={20}>
                                <Button
                                    loading={this.model.isLoading}
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: 126 }}
                                    disabled={!this.model.isTermAndConditionAccepted}
                                    onClick={() => this.model.submitRegistration(this.props.history)}>
                                    {t("sign-up.sign-up1")}
                            </Button>
                                <Checkbox
                                    onChange={ev => this.model.isTermAndConditionAccepted = ev.target.checked}>
                                    {t("sign-up.agree")}<a>{t("sign-up.agree1")}</a>  <Link to="/">Make IT</Link> company.
                                </Checkbox>
                            </Space>
                        </div>
                    </div>
                <Footer />
            </>
        );
    }
}

export default injectIntl(SignUpPage);
