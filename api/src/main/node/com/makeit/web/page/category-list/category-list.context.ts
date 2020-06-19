import "reflect-metadata";
import axios from "axios";

import { CategoryListModel } from "@page/category-list/index";
import { Context } from "@page/decorator";

import { AxiosProjectClient, AxiosFreelancerClient, AxiosCommentClient } from "@client/api-client";

export const CategoryListModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<AxiosProjectClient>(AxiosProjectClient).toConstantValue(new AxiosProjectClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosFreelancerClient>(AxiosFreelancerClient).toConstantValue(new AxiosFreelancerClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosCommentClient>(AxiosCommentClient).toConstantValue(new AxiosCommentClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<CategoryListModel>(CategoryListModel).toSelf().inSingletonScope();
    }
}
