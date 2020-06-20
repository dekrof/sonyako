import { injectable, inject } from "inversify";
import { observable, action, toJS, computed } from 'mobx';

import { AxiosUserClient, AxiosFreelancerClient, AxiosCommentClient, User, CommentDto, CommentType } from '@client/api-client';
import { AppModel } from "@page/app-layout";

@injectable()
export class UserViewModel {

    constructor(
        @inject(AppModel) public appModel: AppModel,
        @inject(AxiosUserClient) private userClient: AxiosUserClient,
        @inject(AxiosFreelancerClient) private freelancerClient: AxiosFreelancerClient,
        @inject(AxiosCommentClient) private commentClient: AxiosCommentClient
    ) {
    }

    @observable
    public isLoading: boolean = false;

    @observable
    public user: User;

    @observable
    public userNotFound: boolean = false;

    @observable
    public comments: CommentDto[] = [];

    @observable
    public isCommentBeingSaved: false;

    @computed
    public get projectHasComments(): boolean {
        return this.comments.length > 0;
    }

    @action
    public async getUserInfo(id: number) {
        try {
            this.isLoading = true;
            const response = await this.freelancerClient.getFreelancer(id).then(value => value.data);
            if (response.success && response.data) {
                this.user = response.data;
                await this.getComments();
            } else {
                this.userNotFound = true;
            }
        } finally {
            this.isLoading = false;
        }
    }

    @action
    public async getComments() {
        const response = await this.commentClient.getUserComments(this.user.id, {page: 0, size: 1000}).then(value => value.data);
        this.comments = this.createCommentTree(response.data.content || []);
    }

    @action
    public async saveComment(comment: CommentDto, parentCommentId: number = null) {
        comment.parent = !!parentCommentId ? this.findComment(this.comments, parentCommentId) : null;
        comment.type = CommentType.USER;
        comment.belongTo = this.user.id;

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
            .deleteUserComment(this.user.id, comment.id, {headers: {Authorization: `${tokenType} ${accessToken}`}})
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
