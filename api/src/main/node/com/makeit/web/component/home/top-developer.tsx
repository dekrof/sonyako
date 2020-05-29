import * as React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Card } from "antd";

class TopDeveloper extends React.Component<WrappedComponentProps> {

    public render() {
        return (
            <>
                <Card className="top-developer">
                    <Card.Meta
                        title="Best Developer"
                        description="Expert Joomla Web Developer " />
                </Card>
            </>
        )
    }
}

export default injectIntl(TopDeveloper);
