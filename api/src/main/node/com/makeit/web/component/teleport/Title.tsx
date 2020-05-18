import * as React from "react";
import {createTeleporter} from "react-teleporter";

const TitleTeleport = createTeleporter();

export function TitleTarget() {
    return <TitleTeleport.Target className="app-sub-title" as="span"/>;
}

export function Title({children}) {
    return <TitleTeleport.Source>{children}</TitleTeleport.Source>;
}
