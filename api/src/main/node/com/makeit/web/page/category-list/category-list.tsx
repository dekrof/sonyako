import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { flow, observable, observe } from 'mobx';
import { observer } from "mobx-react";

import TimeAgo, { TimeAgoProps } from "timeago-react/lib/timeago-react";
import * as timeago from "timeago.js";
import uk from "timeago.js/lib/lang/uk";
import ru from "timeago.js/lib/lang/ru";
import en from "timeago.js/lib/lang/en_US";

import { CategoryListModel, CategoryListModule } from "@page/category-list";
import { Footer, Title } from "@page/app-layout";
import { context, page, resolve } from "@page/decorator";

import { Divider, List, Tabs, Drawer, Comment, Input, Button, Menu, Dropdown, notification } from "antd";
import { FolderViewOutlined, CrownOutlined, UserAddOutlined, SendOutlined, ContactsOutlined } from "@ant-design/icons";

import { ProjectDto, TopDeveloperDto, CurrencyType } from '@client/api-client';

import "@page/category-list/category-list.less";

timeago.register("uk", uk);
timeago.register("en", en);
timeago.register("ru", ru);

const SinceOfTime = (TimeAgo as unknown) as React.Component<TimeAgoProps> & { new(props: TimeAgoProps): React.Component<TimeAgoProps> };

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

type TabKeys = "projects" | "freelancers" | "owners";

@page(false) @context(CategoryListModule) @observer
class CategoryList extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    private model: CategoryListModel;

    @observable
    private textMessage: string;

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
        const {
            totalProjects, projectPageSize, projects,
            totalFreelancers, freelancerPageSize, freelancers,
            totalOwners, ownersPageSize, owners
        } = this.model;
        const { categoryUrl } = this.props.match.params as { categoryUrl: string };
        this.category.url = categoryUrl;

        return (
            <>
                <Title>{this.model.category?.name} Projects</Title>
                <section className="category-list">
                    <Tabs
                        className="category-list-tabs"
                        defaultActiveKey="projects"
                        onChange={(key: TabKeys) => this.handleTabChange(key)}>
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
                                    position: "both",
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
                                    position: "both",
                                    defaultCurrent: this.page,
                                    defaultPageSize: this.size,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "20", "30", "40", "50"],
                                    total: totalFreelancers,
                                    onChange: (page, pageSize) => this.model.getFreelancers(this.category.url, page - 1, pageSize),
                                    onShowSizeChange: (page, pageSize) => this.model.getFreelancers(this.category.url, page - 1, pageSize),
                                }}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="owners" tabKey="owners" tab="Owners">
                            <List
                                grid={{ gutter: 0, column: 2 }}
                                size="large"
                                style={{ width: "100%" }}
                                renderItem={(freelancer: TopDeveloperDto, index: number) => this.renderFreelancer(freelancer, index)}
                                dataSource={
                                    owners
                                }
                                pagination={{
                                    position: "both",
                                    defaultCurrent: this.page,
                                    defaultPageSize: this.size,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "20", "30", "40", "50"],
                                    total: totalOwners,
                                    onChange: (page, pageSize) => this.model.getOwners(this.category.url, page - 1, pageSize),
                                    onShowSizeChange: (page, pageSize) => this.model.getOwners(this.category.url, page - 1, pageSize),
                                }}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </section>
                <Footer />
                <Drawer
                    closable={false}
                    placement="top"
                    className="contact-user-drawer"
                    visible={this.model.isCommentDrawerOpen}
                    footer={this.renderDrawerFooter()}>
                    <Comment
                        avatar={<img src={this.model.jwtData?.avatarUrl} />}
                        author={`${this.model.jwtData?.name} ${this.model.jwtData?.surname}`}
                        content={<>
                            <Input.TextArea rows={4} onChange={(ev) => this.textMessage = ev.target.value} />
                            <p><sub>You writing to {this.model.activeFreelancer?.firstName} {this.model.activeFreelancer?.lastName}</sub></p>
                        </>}
                    />
                </Drawer>
            </>
        );
    }

    private handleTabChange(key: TabKeys) {
        const { projects, freelancers, owners } = this.model;
        if (key === "projects" && projects.length === 0) {
            this.loadProjects(this.category.url);
        }
        if (key === "freelancers" && freelancers.length === 0) {
            this.loadFreelancers(this.category.url);
        }
        if (key === "owners" && owners.length === 0) {
            this.loadOwners(this.category.url);
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

    private loadOwners = flow(function* (url: string) {
        if (url) {
            yield this.model.getOwners(url, this.page, this.size);
        }
    }.bind(this));

    private renderFreelancer(freelancer: TopDeveloperDto, index: number) {
        return (
            <List.Item actions={this.renderFreelancerActions(freelancer)}>
                <List.Item.Meta
                    title={`${freelancer.firstName} ${freelancer.lastName}`}
                    description={
                        <>
                            <span>{freelancer.legalBusiness}</span>
                            <p>
                                <strong>{`${freelancer.rate.rate}${this.getCurrencySign(freelancer.rate.currency)}/hr`}</strong>
                                <br />
                                <span>{`${freelancer.address.city}, ${freelancer.address.countryCode}`}</span>
                            </p>
                        </>
                    }
                    avatar={<img src={freelancer.avatarUrl}
                        width={120}
                        height={120}
                        style={{ padding: 2, borderRadius: 2, border: "1px solid #f0f0f0", background: "#fff" }} />}>
                </List.Item.Meta>
                <p>
                </p>
                <Divider plain style={{ marginBottom: 0 }} />
            </List.Item>
        )
    }

    private sendMessageToUser() {
        if (!this.model.jwtData) {
            notification.warn({
                message: "Sign-in required",
                description: <span>Only authorized users can leave a comment. Please, <a href="/sign-in">sign-in</a> to continue.</span>,
            });
            return;
        }

        this.model.sendMessageToUser(this.textMessage).then(() => {
            this.textMessage = null;
            this.closeDrawer();
        });
    }

    private closeDrawer() {
        this.model.isCommentDrawerOpen = false;
    }

    private openContactDrawer(freelancer: TopDeveloperDto) {
        if (!this.model.jwtData) {
            notification.warn({
                message: "Sign-in required",
                description: <span>Only authorized users can leave a comment. Please, <a href="/sign-in">sign-in</a> to continue.</span>,
            });
            return;
        }
        this.model.activeFreelancer = freelancer;
        this.model.isCommentDrawerOpen = true;
    }

    private renderDrawerFooter() {
        return (
            <>
                <Button onClick={() => this.sendMessageToUser()}>Send Message</Button>
                <a onClick={() => this.closeDrawer()}>Cancel and close</a>
            </>
        );
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
                    <span> Rate Per Hour - <span>{project.ratePerHour}{this.getCurrencySign(project.rateCurrency)} </span></span>
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
            <span key="view-project-action"><FolderViewOutlined /> <Link to={`/project/view/${project.id}`}> View Project</Link></span>,
            <span key="contact-user-action"><CrownOutlined /> <Link to={`/profile/view/${project.owner.id}`}> View Owner</Link></span>,
            <span key="hire-me-action"><UserAddOutlined /><this.hireMenu project={project} /></span>
        ]
    }

    private renderFreelancerActions(freelancer: TopDeveloperDto) {
        return [
            <span key="view-profile-action"><ContactsOutlined /> <Link to={`/profile/view/${freelancer?.id}`}> View Profile</Link></span>,
            <span key="contact-user-action"><a onClick={() => this.openContactDrawer(freelancer)}><SendOutlined /> Contact Freelancer</a></span>,
            <span key="hire-me-action"><UserAddOutlined /><this.hireMenu freelancer={freelancer} /></span>
        ]
    }

    private hireMenu = (props: { project?: ProjectDto, freelancer?: TopDeveloperDto }) => {
        const [menu, setMenu] = React.useState([]);
        const [real, setReal] = React.useState(true);
        React.useEffect(() => {
            const getMenu = async () => {
                const projects = await this.model.getUserProjects(props.project, props.freelancer);
                if (projects.length === 1 && projects[0].id <= 0) {
                    setReal(false);
                }
                setMenu(projects);
            };
            getMenu();
        }, [props.project, props.freelancer]);

        return (
            <Dropdown overlayClassName="hire-me-dropdown" trigger={["click"]} overlay={<Menu>
                {
                    !real ? null : <>
                        <li>
                            <strong>
                            {
                                !!props.project ? "Confirm project before send" : "Select Your Projects"
                            }
                            </strong>
                        </li>
                        <Divider plain/>
                    </>
                }
                {
                    menu.map((value) => (
                        <Menu.Item prefix="ant-dropdown-menu" disabled={value.id === 0} key={`menu-${value.id}`}>
                            <span onClick={()=>this.handleHire(value, props.project, props.freelancer)}>{value.name}</span>
                        </Menu.Item>
                    ))
                }
            </Menu>}><a>Hire Me</a></Dropdown>
        )
    }

    private async handleHire(value, project, freelancer) {
        if (!value || value.id === 0) {
            return;
        }

        if (value && freelancer) {
            await this.model.hireFreelancer(freelancer.id, value.id);
        }

        if (value && project) {
            await this.model.hireFreelancer(value.id, project.id);
        }
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

    private getCurrencySign(currency: CurrencyType | string): string {
        switch (currency) {
            // @formatter:off
            case CurrencyType.EUR: return "€";
            case CurrencyType.GBP: return "£";
            case CurrencyType.UAH: return "₴";
            case CurrencyType.USD: return "$";
            // @formatter:on
        }
    }
}

export default injectIntl(CategoryList);
