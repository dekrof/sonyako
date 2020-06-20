import * as React from "react";
import {Link} from "react-router-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Avatar, Card, Divider, Rate, Space, Tag, Typography, Menu, Dropdown } from 'antd';
import { ProjectDto, CurrencyType, TopDeveloperDto, TopProjectDto } from '@client/api-client';
import { resolve } from "inversify-react";
import { HomeModel } from '../../page/home/home.model';

@observer
class TopDeveloper extends React.Component<WrappedComponentProps & { developer?: TopDeveloperDto }> {

    @resolve
    private model: HomeModel;

    @observable
    private isFocused: boolean;

    public render() {
        const {developer} = this.props;
        const {rate, currency} = developer.rate;
        const {city, countryCode} = developer.address;
        return (
            <>
                <Card
                    className={this.isFocused ? "top-developer-focused" : "top-developer"}
                    actions={[
                        <this.hireMenu key="hire-me-action" freelancer={developer} />,
                        <Link key="view-profile-action" to={`/profile/view/${developer.id}`}><span>View Profile</span></Link>
                    ]}>
                    <Space direction="horizontal" align="start" size={20}>
                        <Avatar
                            size={120}
                            shape="square"
                            style={{border: "1px solid #d9d9d9", borderRadius: 3}}
                            src={developer?.avatarUrl}/>
                        <Space direction="vertical" size={20}>
                            <Rate defaultValue={3.5} allowHalf style={{fontSize: 14}}/>
                            <Typography.Paragraph>
                                <h4>{`${rate}${this.getCurrencySign(currency)}`}/hr</h4>
                                <span style={{height: 44, display: "inline-block"}}>{`${city}, ${countryCode}`}</span>
                            </Typography.Paragraph>
                        </Space>
                    </Space>
                    <Divider plain/>
                    <div className="top-developer-tags">
                        <Tag color="#f0f0f0">Java</Tag>
                        <Tag color="#f0f0f0">TypeScript</Tag>
                        <Tag color="#f0f0f0">Kafka Streams</Tag>
                        <Tag color="#f0f0f0">DataDog</Tag>
                    </div>
                    <Divider plain style={{marginBottom: 20}}/>
                    <Card.Meta
                        title={`${developer.firstName} ${developer.lastName}`}
                        description={<p style={{height: 36, textOverflow: "ellipsis"}}>{developer.legalBusiness}</p>}/>
                </Card>
            </>
        )
    }

    private getCurrencySign(currency: CurrencyType): string {
        switch (currency) {
            // @formatter:off
            case CurrencyType.EUR: return "€";
            case CurrencyType.GBP: return "£";
            case CurrencyType.UAH: return "₴";
            case CurrencyType.USD: return "$";
            // @formatter:on
        }
    }

    private hireMenu = (props: { project?: TopProjectDto, freelancer?: TopDeveloperDto }) => {
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
}

export default injectIntl(TopDeveloper);
