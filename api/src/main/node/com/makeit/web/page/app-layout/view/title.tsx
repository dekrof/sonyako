import * as React from "react";
import { createTeleporter } from "react-teleporter";

const View = createTeleporter();

export function TitleTarget() {
    return <View.Target className="app-sub-title" as="span"/>;
}

export function Title({children}) {
    return <View.Source>{children}</View.Source>;
}
