import * as React from "react";
import { Link } from "react-router-dom";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { createTeleporter } from "react-teleporter";
import { Space, Typography, Divider } from "antd";

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
                                The information provided by Make IT is for general informational purposes only.
                                All information on the Make IT is not real and created for educational purposes only,
                                thus we make no representation or warranty of any kind, express or implied,
                                regarding the accuracy, adequacy, validity, reliability, availability,
                                or completeness of any information on the Make IT application.
                            <br />
                                Under no circumstance shall we have any liability to you for any loss or damage of any kind
                                incurred as a result of the use of this application reliance on any information
                                provided on the site.
                                Your use of the site and your reliance on any information
                                on the site is solely at your own risk.
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
                                <span>
                                    Copy Right © 2020
                                    &#10;
                                    All rights belong to Makydon Sofiia
                                </span>
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
