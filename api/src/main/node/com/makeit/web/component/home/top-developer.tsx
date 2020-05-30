import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Card, Avatar, Rate, Space, Typography, Divider, Tag } from "antd";

@observer
class TopDeveloper extends React.Component<WrappedComponentProps> {

    @observable
    private isFocused: boolean;

    public render() {
        const viewProfileAction = this.renderViewProfileAction();
        return (
            <>
                <Card
                    className={this.isFocused ? "top-developer-focused" : "top-developer"}
                    actions={[
                        "Hire Me",
                        viewProfileAction
                    ]}>
                    <Space direction="horizontal" align="start" size={20}>
                        <Avatar size={120} shape="square" />
                        <Space direction="vertical" size={20}>
                            <Rate defaultValue={3.5} allowHalf style={{ fontSize: 14 }} />
                            <Typography.Paragraph>
                                <h4>$37/hr</h4>
                                <span>Chernivtci, UA</span>
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
                    <Divider plain style={{marginBottom: 20}}/>
                    <Card.Meta
                        title="Best Developer"
                        description="Expert Joomla Web Developer " />
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
