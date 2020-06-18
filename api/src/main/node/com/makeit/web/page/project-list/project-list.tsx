import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";

import TimeAgo, { TimeAgoProps } from "timeago-react/lib/timeago-react";
import * as timeago from "timeago.js";
import uk from "timeago.js/lib/lang/uk";
import ru from "timeago.js/lib/lang/ru";
import en from "timeago.js/lib/lang/en_US";

import { ProjectListModel, ProjectListModule } from "@page/project-list";
import { Footer, Title } from "@page/app-layout";
import { context, page, resolve } from "@page/decorator";

import { List, Divider } from "antd";
import { FolderViewOutlined, PaperClipOutlined, LikeOutlined, UserAddOutlined } from "@ant-design/icons";

import "@page/project-list/project-list.less";
import { ProjectDto } from "@client/api-client";

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

@page(false) @context(ProjectListModule) @observer
class ProjectList extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: ProjectListModel;

    private categoryUrl: string;

    private page: number;

    private size: number;

    public async componentDidMount() {
        const { search } = this.props.location;
        const { categoryUrl } = this.props.match.params as { categoryUrl: string };
        this.categoryUrl = categoryUrl;

        const params = new URLSearchParams(search);
        const [page, size] = [parseInt(params.get("page")), parseInt(params.get("size"))];

        this.page = isNaN(page) ? 0 : page;
        this.size = isNaN(size) ? 20 : size

        if (this.categoryUrl) {
            await this.model.getProjects(this.categoryUrl, this.page, this.size);
        }
    }

    public render() {
        const { total, pageSize, projects } = this.model;
        return (
            <>
                <Title>{this.model.category?.name} Projects</Title>
                <section className="project-list">
                    <List
                        itemLayout="vertical"
                        size="large"
                        style={{ width: "100%" }}
                        renderItem={(project: ProjectDto, index: number) => this.renderProject(project, index)}
                        dataSource={
                            projects
                        }
                        pagination={{
                            defaultCurrent: 1,
                            defaultPageSize: 20,
                            showLessItems: true,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30", "40", "50"],
                            pageSize,
                            total,
                            onChange: (page, pageSize) => this.model.getProjects(this.categoryUrl, page - 1, pageSize),
                            onShowSizeChange: (page, pageSize) => this.model.getProjects(this.categoryUrl, page - 1, pageSize),
                        }}
                    />
                </section>
                <Footer />
            </>
        );
    }

    private renderProject(project: ProjectDto, index: number) {
        const matches = project.description.match(/<[p][^>]*>(.+?)<\/[p]>/gm);
        const description = matches.length > 1
            ? [matches[1], matches[2] || "", matches[3] || "" ].join("<div style='clear: both'></div>")
            : project.description;

        const payment = project.fixedRate
            ? "Fixed Rate"
            : "Hourly";
        return (
            <List.Item actions={this.renderProjectActions(project)}>
                <List.Item.Meta
                    title={`${project.name}`}
                    description={this.renderProjectDescription(project)}
                    avatar={<img src={project.logo}
                        width={60}
                        height={60}
                        style={{ padding: 6, borderRadius: 2, border: "1px solid #f0f0f0", background: "#fff" }} />} />
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
                <p>
                    <strong>Proposals - {project.proposals} person(s). </strong>
                    <span> Rate per Hour - {project.ratePerHour}{project.rateCurrency} </span>
                    <span className="payment-details">
                        <em>{payment} </em>{project.fixedTime ? <em>Fixed Time</em> : null}
                    </span>
                </p>
                <Divider plain style={{ marginBottom: 0 }} />
            </List.Item>
        )
    }

    private renderProjectActions(project: ProjectDto) {
        return [
            <span key="view-project-action"><FolderViewOutlined /> View Project</span>,
            <span key="like-project-action"><LikeOutlined /> Star project</span>,
            <span key="save-project-action"><PaperClipOutlined /> Save project</span>,
            <span key="hire-project-action"><UserAddOutlined /> Hire Me</span>,
        ]
    }

    private renderProjectDescription(project: ProjectDto) {
        const { locale } = this.props.intl;
        const { name, surname } = project.owner.profile;
        return (
            <>
                <strong>Level - {experiences.find(experience => experience.level = project.requiredLevel).label}. </strong>
                <span>Est. time {`${project.maxDuration}-${project.maxDuration}, ${project.loe} hr/week`}. </span>
                <span>Posted: <SinceOfTime datetime={project.createdAt} locale={locale} /> by {`${name} ${surname}`}</span>
            </>
        );
    }
}

export default injectIntl(ProjectList);
