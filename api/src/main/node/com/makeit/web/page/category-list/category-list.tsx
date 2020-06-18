import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import TimeAgo, { TimeAgoProps } from "timeago-react/lib/timeago-react";
import * as timeago from "timeago.js";
import uk from "timeago.js/lib/lang/uk";
import ru from "timeago.js/lib/lang/ru";
import en from "timeago.js/lib/lang/en_US";

import { CategoryListModel, CategoryListModule } from "@page/category-list";
import { Footer, Title } from "@page/app-layout";
import { context, page, resolve } from "@page/decorator";

import { Divider, List, Tabs } from "antd";
import { FolderViewOutlined, LikeOutlined, PaperClipOutlined, UserAddOutlined } from "@ant-design/icons";

import "@page/category-list/category-list.less";
import { ProjectDto, TopDeveloperDto } from "@client/api-client";
import { flow, observable, intercept, observe } from 'mobx';

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

type TabKeys = "projects" | "freelancers";

@page(false) @context(CategoryListModule) @observer
class CategoryList extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: CategoryListModel;

    @observable
    private category: { url: string } = { url: "" };

    private page: number;

    private size: number;

    constructor(props) {
        super(props);
        observe(this.category, "url", (ev) => {
            if (ev.newValue !== ev.oldValue) {
                this.loadProjects(ev.newValue);
            }
            return ev;
        });
    }

    public componentDidMount() {
        const { search } = this.props.location;
        const params = new URLSearchParams(search);
        const [page, size] = [parseInt(params.get("page")), parseInt(params.get("size"))];
        this.page = isNaN(page) ? 0 : page;
        this.size = isNaN(size) ? 20 : size;
    }

    public render() {
        const { totalProjects, projectPageSize, projects, totalFreelancers, freelancerPageSize, freelancers } = this.model;
        const { categoryUrl } = this.props.match.params as { categoryUrl: string };
        this.category.url = categoryUrl;

        return (
            <>
                <Title>{this.model.category?.name} Projects</Title>
                <section className="category-list">
                    <Tabs
                        className="category-list-tabs"
                        defaultActiveKey="projects"
                        onChange={(key: TabKeys) => this.onTabChange(key)}>
                        <Tabs.TabPane key="projects" tabKey="projects" tab="Projects">
                            <List
                                itemLayout="vertical"
                                size="large"
                                style={{ width: "100%" }}
                                renderItem={(project: ProjectDto, index: number) => this.renderProject(project, index)}
                                dataSource={
                                    projects
                                }
                                pagination={{
                                    defaultCurrent: this.page,
                                    defaultPageSize: this.size,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "20", "30", "40", "50"],
                                    total: totalProjects,
                                    onChange: (page, pageSize) => this.model.getProjects(this.category.url, page - 1, pageSize),
                                    onShowSizeChange: (page, pageSize) => this.model.getProjects(this.category.url, page - 1, pageSize),
                                }}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="freelancers" tabKey="freelancers" tab="Freelancers">
                            <List
                                grid={{ gutter: 0, column: 2 }}
                                size="large"
                                style={{ width: "100%" }}
                                renderItem={(freelancer: TopDeveloperDto, index: number) => this.renderFreelancer(freelancer, index)}
                                dataSource={
                                    freelancers
                                }
                                pagination={{
                                    defaultCurrent: this.page,
                                    defaultPageSize: this.size,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["4", "10", "20", "30", "40", "50"],
                                    total: totalFreelancers,
                                    onChange: (page, pageSize) => this.model.getFreelancers(this.category.url, page - 1, pageSize),
                                    onShowSizeChange: (page, pageSize) => this.model.getFreelancers(this.category.url, page  - 1, pageSize),
                                }}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </section>
                <Footer />
            </>
        );
    }

    private onTabChange(key: TabKeys) {
        const { projects, freelancers } = this.model;
        if (key === "projects" && projects.length === 0) {
            this.loadProjects(this.category.url);
        }
        if (key === "freelancers" && freelancers.length === 0) {
            this.loadFreelancers(this.category.url);
        }
    }

    private loadProjects = flow(function* (url: string) {
        if (url) {
            yield this.model.getProjects(url, this.page || 0, this.size || 20);
        }
    }.bind(this));

    private loadFreelancers = flow(function* (url: string) {
        if (url) {
            yield this.model.getFreelancers(url, this.page, this.size);
        }
    }.bind(this));

    private renderFreelancer(freelancer: TopDeveloperDto, index: number) {
        return (
            <List.Item actions={["Hire Me", "View Profile", "Contact Freelancer"]}>
                <List.Item.Meta
                    title={`${freelancer.firstName} ${freelancer.lastName}`}
                    description={freelancer.legalBusiness}
                    avatar={<img src={freelancer.avatarUrl}
                        width={120}
                        height={120}
                        style={{ padding: 2, borderRadius: 2, border: "1px solid #f0f0f0", background: "#fff" }} />} />
                <Divider plain style={{ marginBottom: 0 }} />
            </List.Item>
        )
    }

    private renderProject(project: ProjectDto, index: number) {
        const matches = project.description.match(/<[p][^>]*>(.+?)<\/[p]>/gm);
        const description = matches.length > 1
            ? [matches[1], matches[2] || "", matches[3] || ""].join("<div style='clear: both'></div>")
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
            <span key="view-project-action"><FolderViewOutlined /> <Link to={`/project/view/${project.id}`}>View Project</Link></span>,
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

export default injectIntl(CategoryList);
