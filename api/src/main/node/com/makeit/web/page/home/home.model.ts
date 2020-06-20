import { action, observable, autorun, comparer, computed, toJS } from 'mobx';
import { inject, injectable } from "inversify";

import { AxiosCommentClient, AxiosFreelancerClient, AxiosProjectClient, CommentDto, CommentType, TopDeveloperDto, TopProjectDto, RoleName, ProjectDto } from '@client/api-client';
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

    @action
    public async hireFreelancer(userId: number, projectId: number) {
        const {tokenType, accessToken} = this.appModel.jwt;
        const hired = await this.freelancerClient.hireFreelancer({userId, projectId}, {headers: {Authorization: `${tokenType} ${accessToken}`}})
            .then(value => value.data)
            .then(value => value.data)

        notification.info({
            message: "Hire Me",
            description: hired
                ? "Your proposal is successfully accepted"
                : "Your proposal is not accepted"
        });
    }

    @action
    public async getUserProjects(project: TopProjectDto = null, freelancer: TopDeveloperDto = null): Promise<Array<{id: number, name: string}>> {
        if (!this.jwtData) {
            return [{id: 0, name: "No actions provided. Please, sign-in to continue"}];
        } else {
            const userId = Number(this.jwtData.sub);
            const response = await this.freelancerClient.getFreelancer(userId).then(value => value.data);

            if (response.success) {
                const isOwner = response.data.roles.find(role => role.roleName === RoleName.ROLE_OWNER);

                if (project) {
                    if (isOwner) {
                        return [{id: 0, name: "Owners cannot be hired to project"}];
                    } else {
                        return [{id: project.id, name: project.name}];
                    }
                }

                if (freelancer) {
                    if (isOwner) {
                        const projects =  await this.freelancerClient.getUserProjects(userId, {status: null})
                            .then(value => value.data)
                            .then(value => value.data);

                        if (!projects || projects.length === 0) {
                            return [{id: 0, name: "You do not have any projects yet"}];
                        } else {
                            return projects.map(value => ({id: value.id, name: value.name}))
                        }
                    } else {
                        return [{id: 0, name: "You are not allowed to hire anybody"}]
                    }
                }
            } else {
                return [{id: 0, name: "No actions provided"}]
            }
        }
    }
}
