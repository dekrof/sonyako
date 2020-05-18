import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { observable } from "mobx";
import { observer } from "mobx-react";
import { IViewModel } from "mobx-utils";

import { debounce } from "helpful-decorators";

import { Select } from "formik-antd";
import { Divider, Input } from "antd";

import { Region } from "@client/ukrposhta-client";
import { AddressModel } from "@model/AddressModel";
import { resolve } from '@ioc/app-module-decorator';

@observer
class RegionSelect extends React.Component<WrappedComponentProps> {

    private allRegions: Region[] = [];

    @observable
    private regions: Region[] = [];

    @resolve
    private model: AddressModel;

    public async componentDidMount() {
        this.allRegions = this.regions = await this.model.getRegions();
    }

    private handleChange(id: number) {
        const { intl } = this.props;

        this.model.regionId = id;
        this.model.region = this.regions.filter(region => region.id === id)[0].name[intl.locale];
    }

    @debounce(200)
    private handleFilter(value: string) {
        this.regions = this.allRegions;
        if (value !== "") {
            const search = value.toLowerCase();
            const { locale } = this.props.intl;

            this.regions = this.regions.filter(region => region.name[locale].toLowerCase().indexOf(search) >= 0);
        }
    }

    public render() {
        const { intl } = this.props;
        return <Select
            name="region"
            onChange={id => this.handleChange(id)}
            placeholder="Please select your region"
            dropdownRender={(menu) => (
                <div>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: "16px 8px 0" }}>
                        <Input
                            name="region-filter"
                            placeholder="Enter phrase to filter regions"
                            onChange={ev => this.handleFilter(ev.currentTarget.value || "")} />
                    </div>
                    <Divider orientation="center">{`${this.regions.length} region(s)`}</Divider>
                    {menu}
                </div>
            )}>
            {
                this.regions.map(
                    it => <Select.Option key={`region-${it.id}`} value={it.id}>{it.name[intl.locale]}</Select.Option>
                )
            }
        </Select>
    }
}

export default injectIntl(RegionSelect);
