import * as React from "react";
import { WrappedComponentProps, injectIntl, WithIntlProps } from "react-intl";

interface Props extends WrappedComponentProps {
    id: string;
    tagName?: React.ElementType<any>;
    description?: string | object;
    defaultMessage?: string;
    children?(...nodes: React.ReactNodeArray): React.ReactNode;
}

class FormattedHTMLMessage extends React.Component<Props> {

    public render() {
        const { formatMessage, textComponent: Text } = this.props.intl;
        const {id, description, defaultMessage, tagName: Component = "span", children} = this.props;
        const message = formatMessage({ id, description, defaultMessage });

        return (
            <>
                {
                    typeof children === "function"
                        ? children(message)
                        : <Component dangerouslySetInnerHTML={{ __html: message }} />
                }
            </>
        );
    }
}

export default injectIntl(FormattedHTMLMessage);
