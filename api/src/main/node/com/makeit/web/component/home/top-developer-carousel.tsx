import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Carousel, Space } from "antd";

import { TopDeveloper } from "@component/home";

class TopDeveloperCarousel extends React.Component<WrappedComponentProps> {

    public render() {
        return (
            <>
                <Carousel className="top-developers-carousel">
                    <div>
                        <Space direction="horizontal" size={20}>
                            <TopDeveloper />
                            <TopDeveloper />
                            <TopDeveloper />
                        </Space>
                    </div>
                    <div>
                        <Space direction="horizontal" size={20}>
                            <TopDeveloper />
                            <TopDeveloper />
                            <TopDeveloper />
                        </Space>
                    </div>
                    <div>
                        <Space direction="horizontal" size={20}>
                            <TopDeveloper />
                            <TopDeveloper />
                            <TopDeveloper />
                        </Space>
                    </div>
                </Carousel>
            </>
        );
    }
}

export default injectIntl(TopDeveloperCarousel);
