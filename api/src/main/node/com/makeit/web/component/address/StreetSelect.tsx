import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { observable } from "mobx";
import { observer } from "mobx-react";

import { debounce } from "helpful-decorators";

import { Select } from "formik-antd";
import { Divider, Input } from "antd";

import { StreetType } from '@client/api-client';
import { Street } from "@client/ukrposhta-client";

import {PostalCodeSelect} from "@component/address";
import { AddressModel } from "@model/AddressModel";
import { resolve } from '@ioc/app-module-decorator';

interface StreetSelectProps extends WrappedComponentProps {
    region?: number;
    district?: number;
    city?: number;
}

@observer
class StreetSelect extends React.Component<StreetSelectProps> {

    private allStreets: Street[] = [];

    @observable
    private streets: Street[] = [];

    @observable
    private streetName: string;

    @observable
    private loading: boolean = false;

    @resolve
    private model: AddressModel;

    private handleChange(id: number) {
        const { intl } = this.props;

        this.model.streetId = id;
        this.model.street = this.streets.filter(street => street.id === id)[0].name[intl.locale];
    }

    public async UNSAFE_componentWillReceiveProps(nextProps: StreetSelectProps) {
        const { city } = this.props;

        if (nextProps.city && nextProps.city !== city) {
            this.loading = true;

            try {
                const streets = await this.model.getStreets(nextProps.region, nextProps.district, nextProps.city, this.streetName);
                this.allStreets = this.streets = streets || [];
            } catch (ex) {
                this.allStreets = this.streets = [];
            }
        }
        this.loading = false;
    }

    @debounce(200)
    private handleFilter(value: string) {
        this.streets = this.allStreets;
        if (value !== "") {
            const search = value.toLowerCase();
            const { locale } = this.props.intl;

            this.streets = this.streets.filter(street => street.name[locale].toLowerCase().indexOf(search) >= 0);
        }
    }

    public render() {
        const { intl } = this.props;

        return (
            <span className="ant-input-wrapper ant-input-group">
                <span className="ant-input-group-addon">
                    <Select
                        name="streetType"
                        disabled={!this.model.city}
                        onChange={val => this.model.streetType = val}
                        defaultValue={StreetType.STREET} className="select-before">
                        <Select.Option value={StreetType.STREET}>street</Select.Option>
                        <Select.Option value={StreetType.AVENUE}>avenue</Select.Option>
                        <Select.Option value={StreetType.ALLEY}>alley</Select.Option>
                        <Select.Option value={StreetType.BOULEVARD}>boulevard</Select.Option>
                        <Select.Option value={StreetType.LANE}>lane</Select.Option>
                        <Select.Option value={StreetType.SQUARE}>square</Select.Option>
                    </Select>
                </span>
                <Select
                    name="street"
                    className="street-select"
                    disabled={!this.model.city}
                    loading={this.loading}
                    defaultValue={this.streets.length === 0 ? undefined : this.streets[0].id}
                    onChange={id => this.handleChange(id)}
                    placeholder="Please select your street"
                    dropdownRender={(menu) => (
                        <div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: "16px 8px 0" }}>
                                <Input
                                    name="city-filter"
                                    placeholder="Enter phrase to filter streets"
                                    onChange={ev => this.handleFilter(ev.currentTarget.value || "")} />
                            </div>
                            <Divider orientation="center">{`${this.streets.length} street(s)`}</Divider>
                            {menu}
                        </div>
                    )}>
                    {
                        this.streets.map(
                            it => <Select.Option key={`street-${it.id}`} value={it.id}>{it.name[intl.locale]}</Select.Option>
                        )
                    }
                </Select>
                <span className="ant-input-group-addon">
                    <PostalCodeSelect className="select-after" street={this.model.streetId} />
                </span>
            </span>
        );
    }
}

export default injectIntl(StreetSelect);
