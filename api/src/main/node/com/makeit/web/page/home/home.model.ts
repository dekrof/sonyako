import { action, observable, autorun } from "mobx";
import { inject, injectable } from "inversify";

import { AxiosFreelancerClient, TopDeveloperDto, AxiosProjectClient, TopProjectDto } from '@client/api-client';
import { AppModel } from "@page/app-layout";

@injectable()
export class HomeModel {

    @observable
    public topDevelopers: TopDeveloperDto[] = [];

    @observable
    public topProjects: TopProjectDto[] = [];

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosFreelancerClient) private freelancerClient: AxiosFreelancerClient,
        @inject(AxiosProjectClient) private projectClient: AxiosProjectClient
    ) {
        autorun(reaction => {
            this.getTopDevelopers().then(() => reaction.dispose());
        });

        autorun(reaction => {
            this.getTopProjects().then(() => reaction.dispose());
        });
    }

    @action
    public async getTopDevelopers() {
        try {
            const response = await this.freelancerClient.getTopNineFreelancers();
            this.topDevelopers = response.data;
        } catch (ex) {
            console.error(ex.data);
            this.topDevelopers = [];
        }
    }

    @action
    public async getTopProjects() {
        try {
            const response = await this.projectClient.getLastTenProjects().then(value => value.data);
            this.topProjects = response.data;
        } catch (ex) {
            console.error(ex.data);
            this.topProjects = [];
        }
    }
}
