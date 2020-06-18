import { FormikProps } from "formik";
import { observable, toJS } from "mobx";
import { inject, injectable } from "@page/decorator";

import { AxiosCategoryClient, AxiosProjectClient, CategoryDto, CurrencyType, ProjectDto, TagDto } from "@client/api-client";
import { postConstruct } from "inversify";

import { AppModel } from "@page/app-layout";
import { notification } from "antd";

@injectable()
export class ProjectCreateModel {

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(AxiosProjectClient) private projectClient: AxiosProjectClient,
        @inject(AxiosCategoryClient) private categoryClient: AxiosCategoryClient
    ) {
    }

    @postConstruct()
    private async initialize() {
        const response = await this.categoryClient.getCategories({size: 1000}).then(value => value.data);
        this.categories = response.data.content;
    }

    public form: FormikProps<ProjectCreateModel>;

    public logo: string;

    @observable
    public loading: boolean;

    @observable
    public id: number | null = null;

    @observable
    public categories: CategoryDto[] = [];

    @observable
    public name: string;

    @observable
    public description: string;

    @observable
    public category: CategoryDto;

    @observable
    public fixedRate: boolean = false;

    @observable
    public fixedTime: boolean = false;

    @observable
    public ratePerHour: number;

    @observable
    public rateCurrency: string | CurrencyType = CurrencyType.UAH;

    @observable
    public minDuration: number;

    @observable
    public maxDuration: number;

    @observable
    public loe: number;

    @observable
    public proposals: number;

    @observable
    public requiredLevel: number = 3;

    @observable
    public tags: Array<string | TagDto>;

    public async submitProject() {
        const project = toJS({
            id: this.id,
            name: this.name,
            description: this.description,
            fixedRate: this.fixedRate,
            fixedTime: this.fixedTime,
            category: this.category,
            ratePerHour: this.ratePerHour,
            rateCurrency: this.rateCurrency,
            minDuration: this.minDuration,
            maxDuration: this.maxDuration,
            proposals: this.proposals,
            loe: this.loe,
            logo: this.logo,
            requiredLevel: this.requiredLevel,
            active: true,
            tags: this.tags, // todo: add client later
            company: null    // todo: add company later
        }, {recurseEverything: true})
        try {
            const {tokenType, accessToken} = this.appModel.jwt;
            const response = await this.projectClient
                .saveProject(project as ProjectDto & any, {headers: {Authorization: `${tokenType} ${accessToken}`}})
                .then(value => value.data);
            if (response.success) {
                this.id = response.data.id;
            } else {
                // todo add localization;
                notification.warn({
                    message: "Internal Server Error",
                    description: response.cause.substring(0, 60),
                })
                console.error(response.cause);
            }
        } catch (ex) {
            // todo add localization;
            notification.error({
                message: ex.data.cause
            });
            console.error(ex);
        }
    }
}
