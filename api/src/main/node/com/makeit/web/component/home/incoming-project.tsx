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
                </Card>
            </>
        );
    }
}

export default injectIntl(IncomingProject);
