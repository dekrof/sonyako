import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Avatar, Card, Divider, Rate, Space, Tag, Typography } from "antd";
import { CurrencyType, TopDeveloperDto } from "@client/api-client";

@observer
class TopDeveloper extends React.Component<WrappedComponentProps & { developer?: TopDeveloperDto }> {

    @observable
    private isFocused: boolean;

    public render() {
        const viewProfileAction = this.renderViewProfileAction();
        const {developer} = this.props;
        const {rate, currency} = developer.rate;
        const {city, countryCode} = developer.address;
        return (
            <>
                <Card
                    className={this.isFocused ? "top-developer-focused" : "top-developer"}
                    actions={[
                        "Hire Me",
                        viewProfileAction
                    ]}>
                    <Space direction="horizontal" align="start" size={20}>
                        <Avatar size={120} shape="square" src={developer?.avatarUrl}/>
                        <Space direction="vertical" size={20}>
                            <Rate defaultValue={3.5} allowHalf style={{fontSize: 14}}/>
                            <Typography.Paragraph>
                                <h4>{`${rate}${this.getCurrencySign(currency)}`}/hr</h4>
                                <span style={{height: 44, display: "inline-block"}}>{`${city}, ${countryCode}`}</span>
                            </Typography.Paragraph>
                        </Space>
                    </Space>
                    <Divider plain/>
                    <div className="top-developer-tags">
                        <Tag color="#f0f0f0">Java</Tag>
                        <Tag color="#f0f0f0">TypeScript</Tag>
                        <Tag color="#f0f0f0">Kafka Streams</Tag>
                        <Tag color="#f0f0f0">DataDog</Tag>
                    </div>
                    <Divider plain style={{marginBottom: 20}}/>
                    <Card.Meta
                        title={`${developer.firstName} ${developer.lastName}`}
                        description={<p style={{height: 36, textOverflow: "ellipsis"}}>{developer.legalBusiness}</p>}/>
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

    private getCurrencySign(currency: CurrencyType): string {
        switch (currency) {
            // @formatter:off
            case CurrencyType.EUR: return "€";
            case CurrencyType.GBP: return "£";
            case CurrencyType.UAH: return "₴";
            case CurrencyType.USD: return "$";
            // @formatter:on
        }
    }
}

export default injectIntl(TopDeveloper);
