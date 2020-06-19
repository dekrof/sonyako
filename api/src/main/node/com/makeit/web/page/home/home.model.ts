import { action, observable, autorun, comparer, computed, toJS } from 'mobx';
import { inject, injectable } from "inversify";

import { AxiosCommentClient, AxiosFreelancerClient,  AxiosProjectClient , CommentDto, CommentType, TopDeveloperDto, TopProjectDto } from '@client/api-client';
import { AppModel } from "@page/app-layout";
import { notification } from 'antd';

@injectable()
export class HomeModel {

    @observable
    public isCommentDrawerOpen: boolean = false;

    @observable
    public topDevelopers: TopDeveloperDto[] = [];

    @observable
    public topProjects: TopProjectDto[] = [];

    @observable
    public activeProject: TopProjectDto;

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosFreelancerClient) private freelancerClient: AxiosFreelancerClient,
        @inject(AxiosProjectClient) private projectClient: AxiosProjectClient,
        @inject(AxiosCommentClient) private commentClient: AxiosCommentClient
    ) {
        autorun(reaction => {
            this.getTopDevelopers().then(() => reaction.dispose());
        });

        autorun(reaction => {
            this.getTopProjects().then(() => reaction.dispose());
        });
    }

    @computed
    public get jwtData(): any {
        return this.appModel.jwtData;
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

    @action
    public async sendMessageToOwner(description: string): Promise<CommentDto> {
        const author = Number(this.appModel.jwtData.sub);
        const {tokenType, accessToken} = this.appModel.jwt;

        const comment: any = {
            belongTo: this.activeProject.owner.id,
            commentator: {id: author} as any,
            description: description,
            type: CommentType.USER,
            title: ""
        };

        return await this.commentClient.saveComment(comment, {headers: {Authorization: `${tokenType} ${accessToken}`}})
            .then(value => value.data)
            .then(value => value.data);
    }
}
