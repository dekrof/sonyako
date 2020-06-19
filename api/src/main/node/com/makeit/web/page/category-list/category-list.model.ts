import { inject, injectable } from "inversify";
import { AppModel } from "@page/app-layout";
import { AxiosProjectClient, AxiosFreelancerClient, AxiosCommentClient, CategoryDto, CommentDto, CommentType, ProjectDto, TopDeveloperDto } from "@client/api-client";
import { action, observable, computed } from "mobx";
import { debounce } from "helpful-decorators";

@injectable()
export class CategoryListModel {

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosProjectClient) private projectClient: AxiosProjectClient,
        @inject(AxiosFreelancerClient) private freelancerClient: AxiosFreelancerClient,
        @inject(AxiosCommentClient) private commentClient: AxiosCommentClient
    ) {
    }

    public category: CategoryDto;

    @observable
    public isCommentDrawerOpen: boolean;

    @observable
    public projects: ProjectDto[] = [];

    @observable
    public totalProjects: number = 0;

    @observable
    public projectPageSize: number = 0;

    @observable
    public activeFreelancer: TopDeveloperDto;

    @observable
    public freelancers: TopDeveloperDto[] = [];

    @observable
    public totalFreelancers: number = 0;

    @observable
    public freelancerPageSize: number = 0;

    @computed
    public get jwtData(): any {
        return this.appModel.jwtData;
    }

    @action
    public async sendMessageToUser(description: string): Promise<CommentDto> {
        const author = Number(this.appModel.jwtData.sub);
        const { tokenType, accessToken } = this.appModel.jwt;

        const comment: any = {
            belongTo: this.activeFreelancer.id,
            commentator: { id: author } as any,
            description: description,
            type: CommentType.USER,
            title: ""
        };

        return await this.commentClient.saveComment(comment, { headers: { Authorization: `${tokenType} ${accessToken}` } })
            .then(value => value.data)
            .then(value => value.data);
    }

    @action @debounce(300)
    public async getProjects(categoryUrl: string, page: number, size: number) {
        const retrieveProjects = async () => {
            const category = this.appModel.categories.find(category => category.url === categoryUrl);
            if (category) {
                const response = await this.projectClient.getProjects(category.id, { page, size })
                    .then(value => value.data)
                    .then(value => value.data);

                this.category = category;
                this.projects = response.content;
                this.totalProjects = response.totalElements;
                this.projectPageSize = response.size;
            }
        }

        if (this.appModel.categories.length > 0) {
            await retrieveProjects();
        } else {
            let count = 0;
            const interval = setTimeout(async () => {
                if (++count < 5) {
                    await retrieveProjects();
                    if (this.projects.length > 0) {
                        clearInterval(interval);
                    }
                }
            }, 300);
        }
    }

    @action @debounce(300)
    public async getFreelancers(categoryUrl: string, page: number, size: number) {
        const retrieveFreelancers = async () => {
            const category = this.appModel.categories.find(category => category.url === categoryUrl);
            if (category) {
                const response = await this.freelancerClient.getFreelancers(category.id, { page, size })
                    .then(value => value.data)
                    .then(value => value.data);

                this.category = category;
                this.freelancers = response.content;
                this.totalFreelancers = response.totalElements;
                this.freelancerPageSize = response.size;
            }
        }

        if (this.appModel.categories.length > 0) {
            await retrieveFreelancers();
        } else {
            let count = 0;
            const interval = setTimeout(async () => {
                if (++count < 5) {
                    await retrieveFreelancers();
                    if (this.freelancers.length > 0) {
                        clearInterval(interval);
                    }
                }
            }, 300);
        }
    }
}
