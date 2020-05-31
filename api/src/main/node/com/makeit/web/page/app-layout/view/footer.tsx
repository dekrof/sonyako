import * as React from "react";
import { Link } from "react-router-dom";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { createTeleporter } from "react-teleporter";
import { Space, Typography, Divider } from "antd";

import { FormattedHTMLMessage } from "@page/app-layout/lang";

const View = createTeleporter();

// todo: replace on real API call;
const categories = [
    {
        title: "Web Dev",
        url: "web-dev"
    },
    {
        title: "Mobile Dev",
        url: "mobile-dev"
    },
    {
        title: "UI & UX",
        url: "design"
    },
    {
        title: "Devops & Administration",
        url: "admin-support"
    },
    {
        title: "Customer Service",
        url: "customer-service"
    },
    {
        title: "Marketing",
        url: "marketing"
    }
]

class Footer extends React.Component<WrappedComponentProps> {

    public render() {
        return (
            <View.Source>
                <div className="app-footer-inner">
                    <Space direction="horizontal" size={20} align="start">
                        <div>
                            <Typography.Title>Make IT Warranty</Typography.Title>
                            <Divider plain />
                            <Typography.Paragraph>
                               <FormattedHTMLMessage tagName="div" id="app.footer.warranty-head" />
                            <br />
                                <FormattedHTMLMessage tagName="div" id="app.footer.warranty-text" />
                            </Typography.Paragraph>
                        </div>
                        <div>
                            <Typography.Title>Top Categories</Typography.Title>
                            <Divider plain />
                            <Typography.Paragraph>
                                <ul>
                                    {
                                        categories.map((category, it) => (
                                            <li key={`category-${it}`}>
                                                <Link to={`/category/${category.url}`} id={category.url}>{category.title}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Typography.Paragraph>
                            <Divider plain />
                            <Typography.Paragraph>
                                <FormattedHTMLMessage tagName="span" id="app.footer.copy-right" />
                            </Typography.Paragraph>
                        </div>
                    </Space>
                </div>
            </View.Source>
        );
    }
}

export function FooterTarget() {
    return <View.Target as="div" className="app-footer" />;
}

export default injectIntl(Footer);
