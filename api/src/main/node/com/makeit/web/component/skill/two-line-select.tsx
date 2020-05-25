import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { bind } from "helpful-decorators";
import { FormattedMessage } from "react-intl";

import { Menu, Dropdown } from "antd";
import { ClickParam } from "antd/lib/menu";

export interface TwoLineItem {
    label: string;
    description: string;
}

export interface TwoLineSelectProps extends React.PropsWithChildren<any> {
    inputStyle?: React.CSSProperties | any;
    defaultValue: TwoLineItem;
    data: TwoLineItem[];
    onSelectionChange?: (el: TwoLineItem) => void;
    selectionStyle?: (selection: TwoLineItem | any) => React.CSSProperties;
}

const menu = (items: TwoLineItem[], width: number, onClick: (param: ClickParam) => void) => (
    <Menu
        style={{ width: width || "auto" }}
        className="two-line-select-menu"
        onClick={param => onClick(param)}>
        {
            items.map((item, it) => (
                <Menu.Item className="two-line-select-menu-item" key={it}>
                    <div>
                        <p>
                            <FormattedMessage id={item.label} />
                        </p>
                        <sub>
                            <FormattedMessage id={item.description} />
                        </sub>
                    </div>
                </Menu.Item>
            ))
        }
    </Menu>
);

const input = (item: TwoLineItem, style: React.CSSProperties) => (
    <div className="ant-input two-line-select-input" style={style}>
        <p>
            <FormattedMessage id={item.label} />
        </p>
        <sub>
            <FormattedMessage id={item.description} />
        </sub>
    </div>
);

@observer
export class TwoLineSelect extends React.Component<TwoLineSelectProps> {

    @observable
    private selection: TwoLineItem;

    @bind
    private handleMenuItem(param: ClickParam) {
        const { data, onSelectionChange } = this.props;
        const selection = data[Number(param.key)];
        this.selection = selection;

        if (onSelectionChange) {
            onSelectionChange(selection);
        }
    }

    public render() {
        const { data, defaultValue, inputStyle, selectionStyle } = this.props;
        return (
            <Dropdown
                overlay={menu(data, inputStyle.width, this.handleMenuItem.bind(this))}
                className="two-line-select"
                trigger={["click"]} >
                {
                    !!this.selection
                        ? input(this.selection, Object.assign(!!selectionStyle ? selectionStyle(this.selection) : {}, inputStyle || {}))
                        : input(defaultValue, inputStyle || {})
                }
            </Dropdown>
        );
    }
}
