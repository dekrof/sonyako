import * as React from "react";
import { Menu } from "antd";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { resolve } from "@page/decorator";
import { AppModel } from "@page/app-layout";
import { observer } from "mobx-react";

@observer
class TopCategoriesMenu extends React.Component {

    @resolve
    private model: AppModel;

    public render() {
        const {categories} = this.model;
        return <menu className="app-top-categories-menu">
            <Menu
                mode="horizontal"
                defaultSelectedKeys={[]}>
                {
                    categories.map((category, it) =>
                        <Menu.Item key={it}>
                            <Link to={`/category/${category.url}`} id={category.url}>{category.name}</Link>
                        </Menu.Item>
                    )
                }
                <Menu.Item key={categories.length + 1}>
                    <Link to={"/category/all"} id="all">See all categories</Link>
                </Menu.Item>
            </Menu>
        </menu>
    }
}

export default injectIntl(TopCategoriesMenu);
