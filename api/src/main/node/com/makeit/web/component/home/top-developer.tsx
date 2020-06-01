import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Card, Avatar, Rate, Space, Typography, Divider, Tag } from "antd";
import { TopDeveloperDto } from "@client/api-client";

@observer
class TopDeveloper extends React.Component<WrappedComponentProps & { developer?: TopDeveloperDto }> {

    @observable
    private isFocused: boolean;

    public render() {
        const viewProfileAction = this.renderViewProfileAction();
        const { developer } = this.props;
        return (
            <>
                <Card
                    className={this.isFocused ? "top-developer-focused" : "top-developer"}
                    actions={[
                        "Hire Me",
                        viewProfileAction
                    ]}>
                    <Space direction="horizontal" align="start" size={20}>
                        <Avatar size={120} shape="square" src={developer?.avatarUrl} />
                        <Space direction="vertical" size={20}>
                            <Rate defaultValue={3.5} allowHalf style={{ fontSize: 14 }} />
                            <Typography.Paragraph>
                                <h4>$37/hr</h4>
                                <span>{`${developer.address.city}, ${developer.address.countryCode}`}</span>
                            </Typography.Paragraph>
                        </Space>
                    </Space>
                    <Divider plain />
                    <div className="top-developer-tags">
                        <Tag color="#f0f0f0">Java</Tag>
                        <Tag color="#f0f0f0">TypeScript</Tag>
                        <Tag color="#f0f0f0">Kafka Streams</Tag>
                        <Tag color="#f0f0f0">DataDog</Tag>
                    </div>
                    <Divider plain style={{ marginBottom: 20 }} />
                    <Card.Meta
                        title={`${developer.firstName} ${developer.lastName}`}
                        description="Expert Joomla Web Developer" />
                </Card>
            </>
        )
    }

    private renderViewProfileAction() {
        return (
            <>
                <a onClick={() => this.isFocused = !this.isFocused}>View Profile</a>
            </>
        )
    }
}

export default injectIntl(TopDeveloper);
