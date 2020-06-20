import * as React from "react";
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

import MapGL, { DragEvent, Marker } from "react-map-gl";

import Time from "react-time";
import TimeAgo, { TimeAgoProps } from "timeago-react/lib/timeago-react";
import * as timeago from "timeago.js";
import uk from "timeago.js/lib/lang/uk";
import ru from "timeago.js/lib/lang/ru";
import en from "timeago.js/lib/lang/en_US";

import { flow, observable } from "mobx";
import { Space, Typography, Divider, List, Form, Input, Button, notification, Modal, Comment, Popconfirm } from "antd";

import { context, page, observer, resolve } from "@page/decorator";
import { UserViewModel, UserViewModule } from "@page/user-view";
import { Title, Footer } from "@page/app-layout";

import { Payment, Address, CurrencyType, CommentDto } from '@client/api-client';
import { AxiosVisicomClient, Location } from "@client/visicom-client";

import MapPointer from "@svg/map-pointer.svg";
import "@page/user-view/user-view.less";

timeago.register("uk", uk);
timeago.register("en", en);
timeago.register("ru", ru);

const SinceOfTime = (TimeAgo as unknown) as React.Component<TimeAgoProps> & { new(props): React.Component<TimeAgoProps> };

type Coords = {
    longitude: number;
    latitude: number;
}

type Viewport = {
    pitch: number;
    zoom: number;
} & any & Coords;


@page(false) @context(UserViewModule) @observer
class UserView extends React.Component<WrappedComponentProps & RouteComponentProps> {

    @resolve
    public model: UserViewModel;

    @resolve
    private visicom: AxiosVisicomClient;

    @observable
    private marker: Coords = {
        longitude: Number(process.env.LON),
        latitude: Number(process.env.LAT)
    }

    @observable
    private viewport: Viewport = {
        longitude: Number(process.env.LON),
        latitude: Number(process.env.LAT),
        pitch: 0,
        zoom: 14
    }

    @observable
    private comment: CommentDto = new CommentDto();

    // @ts-ignore;
    private textarea = React.createRef<Input.TextArea>();

    public async UNSAFE_componentWillMount() {
        const { id } = this.props.match.params as any;
        await this.model.getUserInfo(Number(id));
    }

    public render() {
        const { userNotFound, user } = this.model;
        return (
            <>
                <Title>User Profile</Title>
                <section className="user-view">
                    {
                        userNotFound || !user ? null : this.renderUserArticle()
                    }
                </section>
                <Footer />
            </>
        );
    }

    private renderUserArticle() {
        const { user, } = this.model;
        const { profile } = user;
        const { payment, address } = profile;

        this.receiveLocation(address);

        return (
            <>
                <Space direction="horizontal" size={20}>
                    <article>
                        <div>
                            <img
                                src={profile.avatarUrl}
                                width={120}
                                height={120}
                                style={{ padding: 6, borderRadius: 2, border: "1px solid #f0f0f0" }} />
                            <Space
                                direction="vertical"
                                align="start"
                                size={0}
                                style={{ width: "calc(100% - 140px)", float: "right" }}>
                                <Typography.Text>
                                    <h3 style={{lineHeight: "16px", paddingBottom: 10, paddingTop: 8}}>
                                        {profile.name} {profile.surname}
                                        <br />
                                        <sub  style={{color: "#a6a6a9", fontSize: 11}}>
                                            Last update: <Time value={user.updatedAt} format="YYYY-MM-DD HH:mm" />
                                        </sub>
                                    </h3>
                                </Typography.Text>
                                <Typography.Text>
                                    <p>{payment.beneficiaryName}</p>
                                </Typography.Text>
                            </Space>
                        </div>
                        <br />
                        {
                            this.renderUserComments()
                        }
                    </article>
                    <summary>
                        {this.renderUserDetails(payment, address)}
                    </summary>
                </Space>
            </>
        )
    }

    private renderUserComments() {
        const {comments} = this.model;
        return (
            <div>
                <Divider plain dashed/>
                <Typography.Text>
                    <h3>
                        User&apos;s recent history
                    </h3>
                </Typography.Text>
                <List dataSource={comments}
                      bordered={false}
                      itemLayout="horizontal"
                      renderItem={comment => this.renderUserComment(comment)}
                      footer={this.renderCommentForm()}
                />
            </div>
        );
    }

    private renderUserComment(comment: CommentDto) {
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
                        <Time value={comment.createdAt || Date.now()} format="YYYY-MM-DD HH:mm" style={{color: "#a6a6a9"}}/>
                        <span>&nbsp;&rarr;&nbsp;</span>
                        <SinceOfTime datetime={comment.createdAt} live locale={locale}/>
                    </span>}>
                    <ul key={`list-item-comment-replies-${comment.id}`}>
                        {
                            !!comment.replies
                                ? comment.replies.map(reply => this.renderUserComment(reply))
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

    private renderUserDetails(payment: Payment, address: Address) {
        return (
            <>
                <Typography.Text>
                    <h3>User rate & payment</h3>
                </Typography.Text>
                <Typography.Text>
                    <dl>
                        <li><strong>Rate</strong>{`${payment.rate}${this.getCurrencySign(payment.currency)}`}</li>
                        <li><strong>Credit Card</strong>{this.formatCreditCard(payment.cardNumber)}</li>
                    </dl>
                    {
                        !payment.remittanceInfo ? null : <p>{payment.remittanceInfo}</p>
                    }
                    <p style={{paddingBottom: 10}}>
                        <sub  style={{color: "#a6a6a9", float: "right"}}>
                            Last update: <Time value={payment.updatedAt} format="YYYY-MM-DD HH:mm" />
                        </sub>
                    </p>
                </Typography.Text>
                <Divider plain />
                <Typography.Text>
                    <h3>User location</h3>
                </Typography.Text>
                <dl>
                        <li>{address.countryCode}, {address.city}</li>
                        <li>{address.region}, {address.district}</li>
                        <li>
                            {`${address.streetType}`.toLowerCase()} {address.street}, {address.houseNumber}
                        </li>
                        <li>{address.postalCode}</li>
                </dl>
                <MapGL
                      {...this.viewport}
                       width="100%"
                       height="250px"
                       maxPitch={85}
                       mapStyle={process.env.MAP_STYLE}
                       mapboxApiAccessToken={process.env.TOKEN}>
                     <Marker {...this.marker} draggable={false} offsetTop={-20} offsetLeft={-20}>
                            <MapPointer width={40} height={40}/>
                    </Marker>
                </MapGL>
                <p style={{paddingTop: 20, paddingBottom: 10}}>
                    <sub  style={{color: "#a6a6a9", float: "right"}}>
                        Last update: <Time value={payment.updatedAt} format="YYYY-MM-DD HH:mm" />
                    </sub>
                </p>
            </>
        )
    }

    private formatCreditCard(cardNumber: string) {
        const chunks = cardNumber.match(/.{1,4}/g);
        return chunks.map((chunk, it) =>  it === 0 || it === chunks.length -1 ? chunk : "****").join(" ");
    }

    private receiveLocation = flow(function* (address: Address) {
        const text = `${address.postalCode}, ${address.city}, ${address.street} ${address.houseNumber}`;
        console.log(text);
        const location: Location = yield this.visicom.getLocation("uk", text);
        if (location) {
            this.viewport.latitude = location.latitude;
            this.viewport.longitude = location.longitude;
            this.marker = this.viewport;
        }
    }.bind(this));

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

export default injectIntl(UserView);
