import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Card, Avatar, Space, Typography, Divider, Tag } from "antd";

@observer
class IncomingProject extends React.Component<WrappedComponentProps> {

    public render() {
        return (
            <>
                <Card className="incoming-project"
                    actions={["Get Job", "Contact Owner", "View Project"]}>
                    <Space direction="horizontal" align="start" size={20} className="incoming-project-overview">
                        <div>
                            <Avatar size={120} shape="square" />
                            <div className="incoming-project-overview-budjet">
                                <span>$8000/month</span>
                                <br />
                                <kbd>6-8 devs</kbd>
                                <br />
                                <kbd>up to 3 months</kbd>
                            </div>
                        </div>
                        <Space direction="vertical" size={0}>
                            <Typography.Paragraph>
                                <h4>Developer wanted for Codecanyon app re-skinning</h4>
                            </Typography.Paragraph>
                            <br />
                            <Typography.Paragraph type="secondary">
                                Since: 19 May 2020, Located: Kyiv, UA
                            </Typography.Paragraph>
                            <Divider plain />
                            <div className="incoming-project-tags">
                                <Tag color="#f0f0f0">Java</Tag>
                                <Tag color="#f0f0f0">TypeScript</Tag>
                                <Tag color="#f0f0f0">Kafka Streams</Tag>
                                <Tag color="#f0f0f0">DataDog</Tag>
                            </div>
                        </Space>
                    </Space>
                    <Divider plain />
                    <Typography.Paragraph ellipsis={{ rows: 5, expandable: false }}>
                        This is fully designed app both ios and android with the admin dashboard script already setup.
                        The apps pull content from the website/the script through API.
                        We just need someone who is familiar with the current version of XCode and visual studio.
                        App icons, and all integration data will be provided or you will be provided to create new api
                        through our accounts
                    </Typography.Paragraph>
                </Card>
            </>
        );
    }
}

export default injectIntl(IncomingProject);
