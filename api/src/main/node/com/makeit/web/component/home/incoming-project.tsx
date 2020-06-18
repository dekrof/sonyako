import * as React from "react";
import { observer } from "mobx-react";
import Time from "react-time";

import { WrappedComponentProps, injectIntl } from "react-intl";
import { Card, Avatar, Space, Typography, Divider, Tag } from "antd";
import { TopProjectDto } from '../../client/api-client';
import { CurrencyType } from '@client/api-client';
@observer
class IncomingProject extends React.Component<WrappedComponentProps & { project?: TopProjectDto }> {

    public render() {
        const { project } = this.props;

        const matches = project.description.match(/<[p][^>]*>(.+?)<\/[p]>/gm);
        const description = matches.length > 1
            ? [matches[1], matches[2] || ""].join("<div style='clear: both'></div>")
            : project.description;

        return (
            <>
                <Card className="incoming-project"
                    actions={["Get Job", "Contact Owner", "View Project"]}>
                    <Space direction="horizontal" align="start" size={20} className="incoming-project-overview">
                        <div>
                            <Avatar size={120} shape="square" src={project.logo} />
                            <div className="incoming-project-overview-budjet">
                                <span>{`${project.ratePerHour}${this.getCurrencySign(project.rateCurrency)}/hr`}</span>
                                <br />
                                <kbd>{`${project.proposals} persons`}</kbd>
                                <br />
                                <kbd>{`${project.minDuration}-${project.maxDuration} months`}</kbd>
                            </div>
                        </div>
                        <Space direction="vertical" size={0}>
                            <Typography.Paragraph>
                                <h4>{project.name}</h4>
                            </Typography.Paragraph>
                            <br />
                            <Typography.Paragraph type="secondary">
                                Since: <Time value={project.createdAt} format="YY, MMM, DD" />, Located: <span>{project.address.city}, {project.address.countryCode}</span>
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
                    <Typography.Paragraph ellipsis={{ rows: 5, expandable: false }} >
                        <span
                            style={{display: "block", height: 83, overflow: "hidden"}}
                            dangerouslySetInnerHTML={{ __html: description.replace("<p></p>", "") }} />
                    </Typography.Paragraph>
                </Card>
            </>
        );
    }

    private getCurrencySign(currency: string): string {
        switch (currency as CurrencyType) {
            // @formatter:off
            case CurrencyType.EUR: return "€";
            case CurrencyType.GBP: return "£";
            case CurrencyType.UAH: return "₴";
            case CurrencyType.USD: return "$";
            // @formatter:on
        }
    }
}

export default injectIntl(IncomingProject);
