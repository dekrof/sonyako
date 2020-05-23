import { AppModule } from "@page/app-layout/app-layout.context";
import { AppModel } from "@page/app-layout/app-layout.model";
import AppLayout from "@page/app-layout/app-layout";

import SessionExpiration from "@svg/session-expiration.svg";
import UserAnonymous from "@svg/user-anonymous.svg";
import ModalClose from "@svg/modal-close.svg";

export * from "@page/app-layout/top-categories-menu";
export * from "@page/app-layout/progress-bar";
export * from "@page/app-layout/view";

const Icons = {SessionExpiration, UserAnonymous, ModalClose};

export { AppLayout, AppModule, AppModel, Icons };
