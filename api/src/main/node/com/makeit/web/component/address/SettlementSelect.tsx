import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { observable } from "mobx";
import { observer } from "mobx-react";
import { debounce } from "helpful-decorators";

import { Select } from "formik-antd";
import { Divider, Input } from "antd";

import { CityType } from '@client/api-client';
import { City } from "@client/ukrposhta-client";

import { AddressModel } from "@model/AddressModel";
import { resolve } from '@ioc/app-module-decorator';

interface SettlementSelectProps extends WrappedComponentProps {
    region?: number;
    district?: number;
}

@observer
class SettlementSelect extends React.Component<SettlementSelectProps> {

    private allCities: City[] = [];

    @observable
    private cities: City[] = [];

    @observable
    private cityName: string;

    @observable
    private loading: boolean = false;

    @resolve
    private model: AddressModel;

    private handleChange(id: number) {
        const { intl } = this.props;

        this.model.cityId = id;
        this.model.city = this.cities.filter(city => city.id === id)[0].name[intl.locale];
    }

    public async UNSAFE_componentWillReceiveProps(nextProps: SettlementSelectProps) {
        const { district } = this.props;

        if (nextProps.district && nextProps.district !== district) {
            this.loading = true;
            const cities = await this.model.getCities(nextProps.region, nextProps.district, this.cityName);
            this.allCities = this.cities = cities || [];
        }
        this.loading = false;
    }

    @debounce(200)
    private handleFilter(value: string) {
        this.cities = this.allCities;
        if (value !== "") {
            const search = value.toLowerCase();
            const { locale } = this.props.intl;

            this.cities = this.cities.filter(city => city.name[locale].toLowerCase().indexOf(search) >= 0);
        }
    }

    public render() {
        const { intl } = this.props;

        return (
            <span className="ant-input-wrapper ant-input-group">
                <span className="ant-input-group-addon">
                    <Select
                        name="cityType"
                        className="select-before"
                        defaultValue={CityType.CITY}
                        disabled={!this.model.district}
                        onChange={val => this.model.cityType = val}>
                        <Select.Option value={CityType.CITY}>city</Select.Option>
                        <Select.Option value={CityType.TOWN}>town</Select.Option>
                        <Select.Option value={CityType.TOWNSHIP}>township</Select.Option>
                        <Select.Option value={CityType.VILLAGE}>village</Select.Option>
                    </Select>
                </span>
                <Select
                    name="city"
                    loading={this.loading}
                    disabled={!this.model.district}
                    defaultValue={this.cities.length === 0 ? undefined : this.cities[0].id}
                    onChange={id => this.handleChange(id)}
                    placeholder="Please select your city"
                    dropdownRender={(menu) => (
                        <div>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: "16px 8px 0" }}>
                                <Input
                                    name="city-filter"
                                    placeholder="Enter phrase to filter cities"
                                    onChange={ev => this.handleFilter(ev.currentTarget.value || "")} />
                            </div>
                            <Divider orientation="center">{`${this.cities.length} cities(s)`}</Divider>
                            {menu}
                        </div>
                    )}>
                    {
                        this.cities.map(
                            it => <Select.Option key={`city-${it.id}`} value={it.id}>{it.name[intl.locale]}</Select.Option>
                        )
                    }
                </Select>
            </span>
        );
    }
}

export default injectIntl(SettlementSelect);
