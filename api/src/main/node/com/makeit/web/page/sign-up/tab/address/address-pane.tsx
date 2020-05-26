import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { Formik } from 'formik';
import { Divider, Space } from "antd";
import { Form, FormItem, Input } from "formik-antd";

import { LocationInput, RegionSelect, SettlementSelect, StreetSelect, StateSelect } from "@component/address";
import { AddressModel } from "@page/sign-up/tab/address";
import { observer, resolve } from "@page/decorator";

@observer
class AddressPanel extends React.Component<WrappedComponentProps> {

    @resolve
    private model: AddressModel;

    public render() {
        return <>
            <Formik initialValues={this.model} onSubmit={(_values, helpers) => helpers.setSubmitting(false)}>
                {
                    (props) => (
                        <Form layout="vertical" className="signup-form address-form">
                            {
                                (() => {
                                    // the workaraout to fix the bag of formik
                                    this.model.form = props;
                                    return null;
                                })()
                            }
                            <Divider orientation="left">Address Information</Divider>
                            <Space direction="horizontal" size={20}>
                                <FormItem
                                    label="Region"
                                    validate={() => this.model.validateRegion()}
                                    name="region">
                                    <RegionSelect />
                                </FormItem>
                                <FormItem
                                    label="District"
                                    validate={() => this.model.validateState()}
                                    name="district">
                                    <StateSelect region={this.model.regionId} />
                                </FormItem>
                            </Space>
                            <Space direction="horizontal" size={20}>
                                <FormItem
                                    label="Settlement"
                                    validate={() => this.model.validateCity()}
                                    name="city">
                                    <SettlementSelect region={this.model.regionId} district={this.model.districtId} />
                                </FormItem>
                                <FormItem
                                    label="Street & House"
                                    validate={() => this.model.validateStreet()}
                                    name="street">
                                    <StreetSelect region={this.model.regionId} district={this.model.districtId}
                                        city={this.model.cityId} />
                                </FormItem>
                            </Space>
                            <Space direction="horizontal" size={20}>
                                <FormItem
                                    label="Postal Code"
                                    validate={() => this.model.validatePostalCode()}
                                    name="postalCode">
                                    <Input
                                        name="postalCode"
                                        style={{ width: 122 }}
                                        value={this.model.postalCode}
                                        disabled={!this.model.houseNumber}
                                        onChange={ev => this.model.postalCode = ev.currentTarget.value} />
                                </FormItem>
                                <FormItem
                                    label="Entrance & Appartaments"
                                    name="entranceAndAppparaments">
                                    <Input
                                        name="entranceAndAppparaments"
                                        disabled={!this.model.houseNumber}
                                        value={this.model.entranceAndAppparaments}
                                        onChange={ev => this.model.entranceAndAppparaments = ev.currentTarget.value} />
                                </FormItem>
                            </Space>
                            <FormItem
                                label="Location"
                                validate={() => this.model.validateLocation()}
                                name="location">
                                <LocationInput postalCode={this.model.postalCode} />
                            </FormItem>
                        </Form>
                    )
                }
            </Formik>
        </>;
    }
}

export default injectIntl(AddressPanel);
