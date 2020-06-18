import { inject, injectable } from "inversify";
import { AppModel } from "@page/app-layout";
import { AxiosProjectClient, CategoryDto, ProjectDto } from "@client/api-client";
import { action, observable, computed } from "mobx";
import { delay, debounce } from "helpful-decorators";

@injectable()
export class ProjectListModel {

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosProjectClient) private projectClient: AxiosProjectClient
    ) {
    }

    public category: CategoryDto;

    @observable
    public projects: ProjectDto[] = [];

    @observable
    public total: number = 0;

    @observable
    public pageSize: number = 0;

    @action @debounce(300)
    public async getProjects(categoryUrl: string, page: number, size: number) {
        const retrieveCategories = async () => {
            const category = this.appModel.categories.find(category => category.url === categoryUrl);
            if (category) {
                const response = await this.projectClient.getProjects(category.id, {page, size})
                    .then(value => value.data)
                    .then(value => value.data);

                this.category = category;
                this.projects = response.content;
                this.pageSize = response.size;
                this.total = response.totalElements;
            }
        }

        if (this.appModel.categories.length > 0) {
            await retrieveCategories();
        } else {
            let count = 0;
            const interval = setTimeout(async () => {
                if (++count < 5) {
                    await retrieveCategories();
                    if (this.projects.length > 0) {
                        clearInterval(interval);
                    }
                }
            }, 300);
        }
    }
}
