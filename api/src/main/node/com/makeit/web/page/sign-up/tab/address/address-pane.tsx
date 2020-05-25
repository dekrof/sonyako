import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { Formik } from "formik";
import { Divider, Space } from "antd";
import { Form, FormItem, Input } from "formik-antd";

import { LocationInput, RegionSelect, SettlementSelect, StreetSelect, StateSelect } from "@component/address";
import { AddressModel, AddressModule } from "@page/sign-up/tab/address";
import { context, observer, resolve } from "@page/decorator";

@context(AddressModule) @observer
class AddressPanel extends React.Component<WrappedComponentProps> {

    @resolve
    private model: AddressModel;

    public render() {
        return (
            <>
                <Formik
                    initialValues={this.model}
                    onSubmit={() => {/* @ts-ignore */
                    }}
                    render={() => (
                        <Form layout="vertical" className="signup-form address-form">
                            <Divider orientation="left">Address Information</Divider>
                            <Space direction="horizontal" size={20}>
                                <FormItem
                                    label="Region"
                                    name="region">
                                    <RegionSelect/>
                                </FormItem>
                                <FormItem
                                    label="District"
                                    name="district">
                                    <StateSelect region={this.model.regionId}/>
                                </FormItem>
                            </Space>
                            <Space direction="horizontal" size={20}>
                                <FormItem
                                    label="Settlement"
                                    name="settlement">
                                    <SettlementSelect region={this.model.regionId} district={this.model.districtId}/>
                                </FormItem>
                                <FormItem
                                    label="Street & House"
                                    name="street">
                                    <StreetSelect region={this.model.regionId} district={this.model.districtId}
                                                  city={this.model.cityId}/>
                                </FormItem>
                            </Space>

                            <Space direction="horizontal" size={20}>
                                <FormItem
                                    label="Entrance & Appartaments"
                                    name="entranceAndAppparaments">
                                    <Input
                                        name="entranceAndAppparaments"
                                        style={{width: 282}}
                                        disabled={!this.model.houseNumber}
                                        value={this.model.entranceAndAppparaments}
                                        onChange={ev => this.model.entranceAndAppparaments = ev.currentTarget.value}/>
                                </FormItem>
                                <FormItem
                                    label="Postal Code"
                                    name="postalCode">
                                    <Input
                                        name="postalCode"
                                        style={{width: 120}}
                                        value={this.model.postalCode}
                                        disabled={!this.model.houseNumber}
                                        onChange={ev => this.model.postalCode = ev.currentTarget.value}/>
                                </FormItem>
                                <div style={{width: 422}}/>
                            </Space>
                            <FormItem
                                label="Location"
                                name="map">
                                <LocationInput postalCode={this.model.postalCode}/>
                            </FormItem>
                        </Form>
                    )}/>
            </>
        );
    }
}

export default injectIntl(AddressPanel);
