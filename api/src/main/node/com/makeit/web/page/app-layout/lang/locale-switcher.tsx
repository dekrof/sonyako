import * as React from "react"

import { inject, observer } from "mobx-react"
import { Dropdown, Menu } from "antd";

import "@css/translation/locale-switcher.less";

import Translation from "@svg/translation.svg";

const overlay = locale => <Menu className="locale-switcher-menu">
    <Menu.Item className="locale-switcher-menu-option">
        <a onClick={(ev) => {
            ev.preventDefault();
            locale.value = "uk"
        }}>
            <strong>UK</strong>
            <span>Українська</span>
        </a>
    </Menu.Item>
    <Menu.Item className="locale-switcher-menu-option">
        <a onClick={(ev) => {
            ev.preventDefault();
            locale.value = "en"
        }}>
            <strong>EN</strong>
            <span>English</span>
        </a>
    </Menu.Item>
    <Menu.Item className="locale-switcher-menu-option">
        <a onClick={(ev) => {
            ev.preventDefault();
            locale.value = "ru"
        }}>
            <strong>RU</strong>
            <span>Русский</span>
        </a>
    </Menu.Item>
</Menu>;

interface Props {
    locale?: any;
}


const LocaleSwitcher: React.SFC<Props> = ({locale}) => <Dropdown overlay={overlay(locale)}>
    <a className="locale-switcher" onClick={ev => ev.preventDefault()}>
        <Translation/>
        <span>{locale.value}</span>
    </a>
</Dropdown>;

export default inject("locale")(observer(LocaleSwitcher));
