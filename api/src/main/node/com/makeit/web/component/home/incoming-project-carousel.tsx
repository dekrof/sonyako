import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Carousel, Space } from "antd";

import { observer, resolve } from '@page/decorator';
import { HomeModel } from '@page/home';

import { IncomingProject } from "@component/home";

function* chunks<T>(arr: T[], size: number) {
    for (let i = 0; i < arr.length; i += size) {
        yield (arr.slice(i, i + size));
    }
}

@observer
class IncomingProjectCarousel extends React.Component<WrappedComponentProps> {

    @resolve
    public model: HomeModel

    public render() {
        return (
            <>
                <Carousel className="incoming-projects-carousel">
                    {
                         [...chunks(this.model.topProjects, 2)].map((chunk, c) => (
                            <div key={`chunk-${c}`}>
                                <Space direction="horizontal" size={20}>
                                    {
                                        chunk.map((project, i) => (<IncomingProject key={`project-${c}-${i}`} project={project} />))
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

export default injectIntl(IncomingProjectCarousel);
