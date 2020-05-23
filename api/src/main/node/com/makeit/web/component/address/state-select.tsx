import * as React from "react";

import { Select } from "formik-antd";
import { Divider, Input } from "antd";
import { debounce } from "helpful-decorators";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { District } from "@client/ukrposhta-client";
import { AddressModel } from "@page/sign-up/tab/address";
import { observable, observer, resolve } from "@page/decorator";

interface StateSelectProps extends WrappedComponentProps {
    region?: number;
}

@observer
class StateSelect extends React.Component<StateSelectProps> {

    private allDistricts: District[] = [];

    @observable
    private districts: District[] = [];

    @resolve
    private model: AddressModel;

    public async UNSAFE_componentWillReceiveProps(nextProps: StateSelectProps) {
        const {region} = this.props;
        if (nextProps.region && nextProps.region !== region) {
            this.districts = [];
            this.allDistricts = this.districts = await this.model.getDistricts(nextProps.region);
        }
    }

    private handleChange(id: number) {
        const {intl} = this.props;

        this.model.districtId = id;
        this.model.district = this.districts.filter(district => district.id === id)[0].name[intl.locale];
    }

    @debounce(200)
    private handleFilter(value: string) {
        this.districts = this.allDistricts;
        if (value !== "") {
            const search = value.toLowerCase();
            const {locale} = this.props.intl;

            this.districts = this.districts.filter(district => district.name[locale].toLowerCase().indexOf(search) >= 0);
        }
    }

    public render() {
        const {intl} = this.props;
        return <Select
            name="district"
            disabled={!this.model.region}
            defaultValue={this.districts.length === 0 ? undefined : this.districts[0].id}
            onChange={id => this.handleChange(id)}
            placeholder="Please select your district"
            dropdownRender={(menu) => (
                <div>
                    <div style={{display: "flex", flexWrap: "nowrap", padding: "16px 8px 0"}}>
                        <Input
                            name="district-filter"
                            placeholder="Enter phrase to filter districts"
                            onChange={ev => this.handleFilter(ev.currentTarget.value || "")}/>
                    </div>
                    <Divider orientation="center">{`${this.districts.length} district(s)`}</Divider>
                    {menu}
                </div>
            )}>
            {
                this.districts.map(
                    it => <Select.Option key={`district-${it.id}`} value={it.id}>{it.name[intl.locale]}</Select.Option>
                )
            }
        </Select>
    }
}

export default injectIntl(StateSelect);
