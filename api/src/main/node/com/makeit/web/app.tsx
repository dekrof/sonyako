import * as React from "react";
import { FormattedMessage } from "react-intl";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider, observer } from "mobx-react";
import { PageHeader, Button, Space } from "antd";

import { MobxIntlProvider, LocaleStore, LocaleSwitcher } from "@translation/index";
import en from "@translation/locales/en";
import uk from "@translation/locales/uk";
import ru from "@translation/locales/ru";

import TopCategoriesMenu from "@component/shared/TopCategoriesMenu";

import { TitleTarget } from "@component/teleport";
import { SignInPage, SignUpPage } from "@page/pages";

import { module, resolve } from "@ioc/app-module-decorator";
import { AppModule } from "@ioc/AppModule";
import { AppModel } from "@model/AppModel";

import "@css/theme.less";

const store = {
    locale: new LocaleStore("uk", { uk, en, ru }),
};

const extra = <>
    <Space size={24}>
        <Link to="/sign-in"><FormattedMessage id="app.header.sign-in" /></Link>
        <Link to="/sign-up"><FormattedMessage id="app.header.sign-up" /></Link>
        <Button type="primary"><FormattedMessage id="app.header.post-job" /></Button>
        <LocaleSwitcher />
    </Space>
</>;

@observer @module(AppModule)
export default class App extends React.Component {

    @resolve
    private model: AppModel;

    public render() {
        return (
            <Provider {...store}>
                <MobxIntlProvider>
                    <Router>
                        <Route render={({ location }) => (
                            <main className="app">
                                <PageHeader
                                    className="app-header"
                                    title={<div className="app-logo"><Link to="/"><span>Make IT</span></Link></div>}
                                    subTitle={<TitleTarget />}
                                    extra={extra}
                                    onBack={() => window.history.back()} />
                                <TopCategoriesMenu />
                                <Switch>
                                    <Route path="/sign-in"><SignInPage /></Route>
                                    <Route path={["/sign-up", "/sign-up/(user|owner)/:tab?"]} exact component={SignUpPage}/>
                                    <Route path="/"><SignInPage /></Route>
                                </Switch>
                            </main>
                        )} />
                    </Router>
                </MobxIntlProvider>
            </Provider>
        )
    }
}
