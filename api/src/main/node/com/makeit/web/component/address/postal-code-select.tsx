import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { Select } from "formik-antd";

import { PostalCode } from "@client/ukrposhta-client";
import { AddressModel } from "@page/sign-up/tab/address";
import { observable, observer, resolve } from "@page/decorator";

interface PostalCodeSelectProps extends WrappedComponentProps {
    street?: number;
    className?: string;
}

@observer
class PostalCodeSelect extends React.Component<PostalCodeSelectProps> {

    @observable
    private postalCodes: PostalCode[] = [];

    @resolve
    private model: AddressModel;

    public async UNSAFE_componentWillReceiveProps(nextProps: PostalCodeSelectProps) {
        const {street} = this.props;
        if (nextProps.street && nextProps.street !== street) {
            this.postalCodes = [];
            this.postalCodes = await this.model.getPostalCodes(nextProps.street);
        }
    }

    private handleChange(houseNumber: string) {
        this.model.houseNumber = houseNumber;
        this.model.postalCode = this.postalCodes.filter(postalCode => postalCode.houseNumber === houseNumber)[0].postcode;
    }

    public render() {
        const {intl, className} = this.props;
        return <Select
            name="houseNumber"
            className={className}
            disabled={!this.model.street}
            onChange={id => this.handleChange(id)}
            placeholder="###">
            {
                this.postalCodes.map(
                    (it, i) => <Select.Option key={`postal-code-${i}`} value={it.houseNumber}>{it.houseNumber}</Select.Option>
                )
            }
        </Select>
    }
}

export default injectIntl(PostalCodeSelect);
