import * as React from "react";
import { Menu } from "antd";
import { injectIntl } from "react-intl";
import { Link } from 'react-router-dom';

// todo: replace on real API call;
const categories = [
    {
        title: "Web Dev",
        url: "web-dev"
    },
    {
        title: "Mobile Dev",
        url: "mobile-dev"
    },
    {
        title: "UI & UX",
        url: "design"
    },
    {
        title: "Devops & Administration",
        url: "admin-support"
    },
    {
        title: "Customer Service",
        url: "customer-service"
    },
    {
        title: "Marketing",
        url: "marketing"
    }
]

class TopCategoriesMenu extends React.Component {

    public render() {
        return <menu className="app-top-categories-menu">
            <Menu
                mode="horizontal"
                defaultSelectedKeys={[]}>
                {
                    categories.map((category, it) =>
                        <Menu.Item key={it}>
                            <Link to={`/category/${category.url}`} id={category.url}>{category.title}</Link>
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
