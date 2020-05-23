import * as React from "react";
import { IntlProvider } from "react-intl"

import { inject, observer } from "mobx-react";
import { LocaleStore } from "@translation/store";

const LocaleProviderInner = ({locale, children, ...props}: { locale?: LocaleStore; children: any }) => {
    const loc = locale.value;
    const messages = locale.messages;
    return <IntlProvider key={loc} locale={loc} onError={() => {/* @ts-ignore */
    }} messages={messages} {...props}>
        {children}
    </IntlProvider>
}

export const LocaleProvider = inject("locale")(observer(LocaleProviderInner));
