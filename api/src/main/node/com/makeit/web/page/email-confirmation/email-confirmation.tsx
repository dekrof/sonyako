import * as React from "react";
import { RouteComponentProps } from "react-router";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Typography, Button, Space } from "antd";
import { Title, Footer } from "@page/app-layout";

import { Pictures } from "@page/email-confirmation";

import "@page/email-confirmation/email-confirmation.less";

class EmailConfirmation extends React.Component<WrappedComponentProps & RouteComponentProps> {

    public render() {
        return (
            <>
                <Title>Email Confirmed</Title>
                <section className="email-confirmation">
                    <Pictures.EmailConfirmationPicture width={575} height={378} style={{marginBottom: 20}} />
                    <Typography.Title style={{color: "#00b3a5"}}>Email confirmed</Typography.Title>
                    <Space direction="vertical" align="center" size={20} style={{textAlign: "center"}}>
                    <Typography.Paragraph>
                        Email confirmation was successful.
                        Now, you can authorize yourself and continue discover everything in Make IT
                    </Typography.Paragraph>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => this.props.history.push("/")}>Continue to App</Button>
                    </Space>
                </section>
                <Footer />
            </>
        );
    }
}

export default injectIntl(EmailConfirmation);
