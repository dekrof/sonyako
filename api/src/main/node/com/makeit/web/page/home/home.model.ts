import { action, observable, autorun } from "mobx";
import { inject, injectable } from "inversify";

import { AxiosFreelancerClient, TopDeveloperDto } from "@client/api-client";
import { AppModel } from "@page/app-layout";

@injectable()
export class HomeModel {

    @observable
    public topDevelopers: TopDeveloperDto[] = [];

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosFreelancerClient) private client: AxiosFreelancerClient
    ) {
        autorun(reaction => {
            this.getTopDevelopers().then(() => reaction.dispose());
        });
    }

    @action
    public async getTopDevelopers() {
        try {
            const response = await this.client.getTopNineFreelancers();
            this.topDevelopers = response.data;
        } catch (ex) {
            console.error(ex.data);
            this.topDevelopers = [];
        }
    }
}
