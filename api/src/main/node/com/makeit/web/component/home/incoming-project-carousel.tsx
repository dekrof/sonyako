import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Carousel, Space } from "antd";

import { IncomingProject } from "@component/home";

class IncomingProjectCarousel extends React.Component<WrappedComponentProps> {

    public render() {
        return (
            <>
                <Carousel className="incoming-projects-carousel">
                    <div>
                        <Space direction="horizontal" size={20}>
                            <IncomingProject />
                            <IncomingProject />
                        </Space>
                    </div>
                    <div>
                        <Space direction="horizontal" size={20}>
                            <IncomingProject />
                            <IncomingProject />
                        </Space>
                    </div>
                    <div>
                        <Space direction="horizontal" size={20}>
                            <IncomingProject />
                            <IncomingProject />
                        </Space>
                    </div>
                    <div>
                        <Space direction="horizontal" size={20}>
                            <IncomingProject />
                            <IncomingProject />
                        </Space>
                    </div>
                    <div>
                        <Space direction="horizontal" size={20}>
                            <IncomingProject />
                            <IncomingProject />
                        </Space>
                    </div>
                </Carousel>
            </>
        );
    }
}

export default injectIntl(IncomingProjectCarousel);
