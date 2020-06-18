import { FormikProps } from "formik";
import { action, computed, observable, toJS } from "mobx";
import { inject, injectable } from "@page/decorator";

import { AxiosCommentClient, AxiosProjectClient, CommentDto, CommentType, ProjectDto } from "@client/api-client";

import { AppModel } from "@page/app-layout";

@injectable()
export class ProjectViewModel {

    constructor(
        @inject(AppModel) public appModel: AppModel,
        @inject(AxiosProjectClient) private projectClient: AxiosProjectClient,
        @inject(AxiosCommentClient) private commentClient: AxiosCommentClient
    ) {
    }

    public form: FormikProps<ProjectViewModel>;

    @observable
    public project: ProjectDto;

    @observable
    public comments: CommentDto[] = [];

    @observable
    public isLoading: boolean = false;

    @observable
    public isCommentBeingSaved: boolean = false;

    @observable
    public projectNotFound: boolean = false;

    @computed
    public get projectHasComments(): boolean {
        return this.comments.length > 0;
    }

    @action
    public async getProjectInfo(id: number) {
        try {
            this.isLoading = true;
            const response = await this.projectClient.getProject(id).then(value => value.data);
            if (response.success && response.data) {
                this.project = response.data;
                await this.getComments();
            } else {
                this.projectNotFound = true;
            }
        } finally {
            this.isLoading = false;
        }
    }

    @action
    public async getComments() {
        const response = await this.commentClient.getProjectComments(this.project.id, {page: 0, size: 1000}).then(value => value.data);
        this.comments = this.createCommentTree(response.data.content || []);
    }

    @action
    public async saveComment(comment: CommentDto, parentCommentId: number = null) {
        comment.parent = !!parentCommentId ? this.findComment(this.comments, parentCommentId) : null;
        comment.type = CommentType.PROJECT;
        comment.belongTo = this.project.id;

        const {tokenType, accessToken} = this.appModel.jwt;
        const response = await this.commentClient
            .saveComment(comment, {headers: {Authorization: `${tokenType} ${accessToken}`}})
            .then(value => value.data);

        comment.id = response.data.id;
        return comment;
    }

    @action
    public async deleteComment(comment: CommentDto) {
        const {tokenType, accessToken} = this.appModel.jwt;
        const response = await this.commentClient
            .deleteComment(this.project.id, comment.id, {headers: {Authorization: `${tokenType} ${accessToken}`}})
            .then(value => value.data);

        await this.getComments();
    }

    private findComment(comments: CommentDto[], commentId: number) {
        let result = null;
        for (const comment of comments) {
            if (comment.id.toFixed(16) === commentId.toFixed(16)) {
                result = comment;
            }
            if (!result && comment.replies) {
                result = this.findComment(comment.replies, commentId);
            }
        }
        return toJS(result, {recurseEverything: true, detectCycles: true});
    }

    private createCommentTree(comments: CommentDto[]) {
        const table = Object.create(null);
        comments.forEach(comment => table[comment.id] = {...comment, replies: []});

        const tree: CommentDto[] = [];
        comments.forEach(comment => {
            if (comment.parent) table[comment.parent.id].replies.push(table[comment.id])
            else tree.push(table[comment.id])
        });

        return tree;
    }
}
