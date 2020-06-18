import "reflect-metadata";
import axios from "axios";

import { Context } from "@page/decorator";
import { AxiosCommentClient, AxiosProjectClient } from "@client/api-client";
import { ProjectViewModel } from "@page/project-view/project-view.model";

export const ProjectViewModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<AxiosProjectClient>(AxiosProjectClient).toConstantValue(new AxiosProjectClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosCommentClient>(AxiosCommentClient).toConstantValue(new AxiosCommentClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<ProjectViewModel>(ProjectViewModel).toSelf().inSingletonScope();
    }
}
