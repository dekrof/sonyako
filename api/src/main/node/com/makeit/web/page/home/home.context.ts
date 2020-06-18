import "reflect-metadata";
import axios from "axios";

import { AxiosFreelancerClient } from "@client/api-client";
import { HomeModel } from "@page/home/home.model";
import { Context } from "@page/decorator";
import { AxiosProjectClient } from '../../client/api-client';

export const HomeModule: Context = {
    bootstrap: (ctx) => {
        ctx.bind<AxiosFreelancerClient>(AxiosFreelancerClient).toConstantValue(new AxiosFreelancerClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<AxiosProjectClient>(AxiosProjectClient).toConstantValue(new AxiosProjectClient(
            process.env.API_BASE_URL,
            axios.create()
        ));
        ctx.bind<HomeModel>(HomeModel).toSelf().inSingletonScope();
    }
}
