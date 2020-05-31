import * as React from "react";
import { RouteComponentProps } from "react-router";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Typography, Button, Space } from "antd";
import { Title, Footer } from "@page/app-layout";
import { Pictures } from "@page/email-verification";

import "@page/email-confirmation/email-confirmation.less";

class EmailVerification extends React.Component<WrappedComponentProps & RouteComponentProps> {

    public render() {
        return (
            <>
                <Title>Verify Email</Title>
                <section className="email-confirmation">
                    <Pictures.EmailVerificationPicture width={575} height={378} style={{marginBottom: 20}} />
                    <Typography.Title style={{color: "#00b3a5"}}>You are successfully registered!</Typography.Title>
                    <Space direction="vertical" align="center" size={20} style={{textAlign: "center"}}>
                    <Typography.Paragraph>
                        We sent email to verify registration.
                        Please follow the link in this mail to complete registration.
                    </Typography.Paragraph>
                    <Button
                        style={{borderColor: "#9a2c80", borderWidth: 2, borderRadius: 3}}
                        type="ghost"
                        size="large"
                        onClick={() => this.props.history.push("/")}>Continue to App</Button>
                    </Space>
                </section>
                <Footer />
            </>
        );
    }
}

export default injectIntl(EmailVerification);
