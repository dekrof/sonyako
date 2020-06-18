import * as React from "react";
import { RouteComponentProps } from "react-router";

import { injectIntl, WrappedComponentProps } from "react-intl";

import { Button, Comment, Divider, Form, Input, List, Modal, notification, Popconfirm, Rate, Space, Typography } from "antd";

import Time from "react-time";
import TimeAgo, { TimeAgoProps } from "timeago-react/lib/timeago-react";
import * as timeago from "timeago.js";
import uk from "timeago.js/lib/lang/uk";
import ru from "timeago.js/lib/lang/ru";
import en from "timeago.js/lib/lang/en_US";

import { BaseProfileDto, CommentDto, ProjectDto } from "@client/api-client";
import { ProjectViewModel, ProjectViewModule } from "@page/project-view";
import { context, observable, observer, page, resolve } from "@page/decorator";
import { Footer, Title } from "@page/app-layout";

import "@page/project-view/project-view.less";

timeago.register("uk", uk);
timeago.register("en", en);
timeago.register("ru", ru);

const SinceOfTime = (TimeAgo as unknown) as React.Component<TimeAgoProps> & { new(props): React.Component<TimeAgoProps> };

const experiences = [
    {
        level: 1,
        label: "Junior",
    },
    {
        level: 2,
        label: "Low Intermediate",
    },
    {
        level: 3,
        label: "Intermediate",
    },
    {
        level: 4,
        label: "Upper Intermediate",
    },
    {
        level: 5,
        label: "Senior",
    }
];

@page(false) @context(ProjectViewModule) @observer
class ProjectView extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: ProjectViewModel;

    @observable
    private comment: CommentDto = new CommentDto();

    // @ts-ignore;
    private textarea = React.createRef<Input.TextArea>();

    public async UNSAFE_componentWillMount() {
        const {id} = this.props.match.params as any;
        const projectId = parseInt(id, 10);
        await this.model.getProjectInfo(projectId);
    }

    public render() {
        const {projectNotFound, project} = this.model;
        return (
            <>
                <Title>Project View</Title>
                <section className="project-view">
                    {
                        projectNotFound || !project ? null : this.renderProjectArticle()
                    }
                </section>
                <Footer/>
            </>
        );
    }

    private renderProjectArticle() {
        const {project} = this.model;
        const {profile} = project?.owner;
        return (
            <Space direction="horizontal" size={20}>
                <article>
                    <div>
                        <img
                            src={project.logo}
                            width={120}
                            height={120}
                            style={{padding: 6, borderRadius: 2, border: "1px solid #f0f0f0"}} />
                        <Space
                            direction="vertical"
                            align="start"
                            size={0}
                            style={{width: "calc(100% - 140px)", float: "right"}}>
                            <Typography.Text><h3>{project.name}</h3> </Typography.Text>
                            <Rate defaultValue={project.rating} allowHalf/>
                        </Space>
                    </div>
                    <br />
                    <Typography.Text>
                        <p dangerouslySetInnerHTML={{__html: project.description}}/>
                    </Typography.Text>
                    {
                        this.renderProjectComments()
                    }
                </article>
                <summary>
                    {this.renderProjectDetails(project)}
                    <Divider plain dashed/>
                    <Space direction="vertical" size={20} align="center">
                        <Button type="primary">Submit Proposal</Button>
                        <Button danger>Flag as inappropriate</Button>
                    </Space>
                    <Divider plain dashed/>
                    <br/>
                    {this.renderClientDetails(profile)}
                </summary>
            </Space>
        )
    }

    private renderClientDetails(profile: BaseProfileDto) {
        return (
            <>
                <Typography.Text>
                    <h3>About the client</h3>
                </Typography.Text>
                <Typography.Text>
                    <dl>
                        <li>
                            <div>
                                <img src={profile.avatarUrl} width={60} height={60} style={{float: "left"}}/>
                            </div>
                            <Space
                                direction="vertical"
                                align="start"
                                size={0}
                                style={{width: "calc(100% - 80px)", float: "right"}}>
                                <strong>{profile.name} {profile.surname}</strong>
                                <span>{profile.email}</span>
                            </Space>
                        </li>
                    </dl>
                </Typography.Text>
            </>
        );
    }

    private renderProjectDetails(project: ProjectDto) {
        return (
            <>
                <Typography.Text>
                    <h3>Project details</h3>
                </Typography.Text>
                <Typography.Text>
                    <dl>
                        <li><strong>Category</strong>{`${project.category.name}`}</li>
                        <li><strong>Duration</strong>{`${project.minDuration}-${project.maxDuration} month(s)`}</li>
                        <li><strong>Proposals</strong>{`Up to ${project.proposals} person(s)`}</li>
                        <li><strong>Required Level</strong>{experiences.find(experience => experience.level = project.requiredLevel).label}</li>
                        <li><strong>Level of Efforts</strong>{`${project.loe} hr/week`}</li>
                        <li><strong>Rate</strong>{`${project.ratePerHour} ${project.rateCurrency} per hour`}</li>
                        <li>{!project.fixedRate ? null : <em>Fixed Rate</em>} {!project.fixedTime ? null : <em>Fixed Time</em>}</li>
                    </dl>
                </Typography.Text>
            </>
        );
    }

    private renderProjectComments() {
        const {comments, isCommentBeingSaved} = this.model;
        return (
            <div>
                <Divider plain dashed/>
                <Typography.Text>
                    <h3>
                        Project&apos;s recent history
                    </h3>
                </Typography.Text>
                <List dataSource={comments}
                      bordered={false}
                      itemLayout="horizontal"
                      renderItem={comment => this.renderProjectComment(comment)}
                      footer={this.renderCommentForm()}
                />
            </div>
        );
    }

    private renderCommentForm(currentComment: CommentDto = null) {
        const {comments, isCommentBeingSaved} = this.model;
        return (
            <Form>
                <Form.Item>
                    <Input.TextArea
                        ref={currentComment ? null : this.textarea}
                        rows={3}
                        onChange={ev => {
                            this.comment.description = ev.target.value;
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        onClick={() => this.addComment(currentComment)}
                        loading={isCommentBeingSaved} type="ghost">
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    private renderProjectComment(comment: CommentDto) {
        const {locale} = this.props.intl;
        const author = comment.commentator
            ? `${comment.commentator.profile.name} ${comment.commentator.profile.surname}`
            : "anonymous";

        return (
            <List.Item key={`list-item-${comment.id}`}>
                <Comment
                    key={`list-item-comment-${comment.id}`}
                    actions={[
                        <a key="comment-nested-reply-to"
                           onClick={ev => this.renderCommentPopup(comment)}>Reply to {author}</a>,
                        <Divider type="vertical" key={Math.random()}/>,
                        <Popconfirm
                            key={Math.random()}
                            overlayClassName="delete-project-popconfirm"
                            title="Are you sure delete this comment?"
                            onConfirm={() => this.deleteComment(comment)}
                            okText="Yes" cancelText="No">
                            <a key="comment-nested-delete">Delete comment</a>
                        </Popconfirm>
                    ]}
                    author={author}
                    avatar={comment.commentator?.profile?.avatarUrl}
                    content={comment.description}
                    datetime={<span>
                        <Time value={comment.createdAt} format="YYYY-MM-DD HH:mm" style={{color: "#a6a6a9"}}/>
                        <span>&nbsp;&rarr;&nbsp;</span>
                        <SinceOfTime datetime={comment.createdAt} live locale={locale}/>
                    </span>}>
                    <ul key={`list-item-comment-replies-${comment.id}`}>
                        {
                            !!comment.replies
                                ? comment.replies.map(reply => this.renderProjectComment(reply))
                                : null
                        }
                    </ul>
                </Comment>
            </List.Item>
        );
    }

    private renderCommentPopup(comment: CommentDto) {
        Modal.info({
            width: 600,
            centered: true,
            maskStyle: {background: "transparent"},
            maskClosable: false,
            icon: null,
            title: "Reply on comment",
            content: this.renderCommentForm(comment)
        });
    }

    private async deleteComment(comment: CommentDto) {
        const {jwt, helper} = this.model.appModel;

        if (!jwt) {
            notification.warn({
                message: "Sign-in required",
                description: <span>Only author of comment can delete a comment. Please, <a href="/sign-in">sign-in</a> to continue.</span>,
            });
            return;
        }
        await this.model.deleteComment(comment);
    }

    private async addComment(parent: CommentDto = null) {
        const {jwt, helper} = this.model.appModel;

        if (!jwt) {
            notification.warn({
                message: "Sign-in required",
                description: <span>Only authorized users can leave a comment. Please, <a href="/sign-in">sign-in</a> to continue.</span>,
            });
            return;
        }

        const {sub, id, avatarUrl, name, surname} = helper.decodeToken(jwt.accessToken);
        this.comment.commentator = {id: parseInt(sub, 10), profile: {id, avatarUrl, name, surname} as any} as any;

        if (parent !== null) {
            if (!parent.replies) {
                parent.replies = [];
            }
            parent.replies.push(this.comment);

            Modal.destroyAll();
        } else {
            this.model.comments.push(this.comment);
        }

        await this.model.saveComment(this.comment, parent?.id).then(() => {
            this.comment = new CommentDto();
            this.forceUpdate();
        });
        this.textarea.current?.setState({value: ""});
    }
}

export default injectIntl(ProjectView);
