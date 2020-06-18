import "reflect-metadata";
import axios from "axios";

import { Context } from "@page/decorator";
import { AxiosCategoryClient, AxiosProjectClient } from "@client/api-client";
import { ProjectCreateModel } from "@page/project-create/project-create.model";

export const ProjectCreateModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<AxiosProjectClient>(AxiosProjectClient).toConstantValue(new AxiosProjectClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosCategoryClient>(AxiosCategoryClient).toConstantValue(new AxiosCategoryClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<ProjectCreateModel>(ProjectCreateModel).toSelf().inSingletonScope();
    }
}
