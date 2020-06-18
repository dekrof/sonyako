import "reflect-metadata";
import axios from "axios";

import { ProjectListModel } from "@page/project-list/index";
import { Context } from "@page/decorator";

import { AxiosProjectClient } from "@client/api-client";

export const ProjectListModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<AxiosProjectClient>(AxiosProjectClient).toConstantValue(new AxiosProjectClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<ProjectListModel>(ProjectListModel).toSelf().inSingletonScope();
    }
}
