import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Carousel, Space, Empty, Typography } from "antd";

import { TopDeveloper } from "@component/home";
import { HomeModel } from "@page/home";
import { resolve, observer } from '@page/decorator';
import { toJS } from "mobx";

function* chunks<T>(arr: T[], size: number) {
    for (let i = 0; i < arr.length; i += size) {
        yield (arr.slice(i, i + size));
    }
}

@observer
class TopDeveloperCarousel extends React.Component<WrappedComponentProps> {

    @resolve
    public model: HomeModel

    public render() {
        return (
            <>
                <Carousel className="top-developers-carousel">
                    {
                        [...chunks(this.model.topDevelopers, 3)].map((chunk, c) => (
                            <div key={`chunk-${c}`}>
                                <Space direction="horizontal" size={20}>
                                    {
                                        chunk.map((developer, i) => <TopDeveloper key={`dev-${i}`} developer={developer} />)
                                    }
                                    {
                                        chunk.length === 3
                                            ? null
                                            : <div className="no-more-developers">
                                                <Empty
                                                    style={{ margin: "0 auto" }}
                                                    description={
                                                        <Typography.Text type="secondary">No more developers</Typography.Text>
                                                    } />
                                            </div>
                                    }
                                </Space>
                            </div>
                        ))
                    }
                </Carousel>
            </>
        );
    }
}

export default injectIntl(TopDeveloperCarousel);
