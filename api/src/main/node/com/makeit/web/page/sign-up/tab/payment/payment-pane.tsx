import * as React from "react";
import { Link } from "react-router-dom";
import { WrappedComponentProps, injectIntl } from "react-intl";

import Cards, { Focused } from "react-credit-cards";
import { Divider, Space, Typography } from "antd";
import { Formik } from "formik";
import { Form, FormItem, Input, InputNumber, DatePicker, Checkbox, Select } from 'formik-antd';
import { observer, observable } from "@page/decorator";

import "@css/credit-cards.less";

export enum AllowedCurrency {
    USD = "USD", EUR = "EUR", UAH = "UAH", GBP = "GBP"
}

@observer
class PaymentPanel extends React.Component<WrappedComponentProps> {

    @observable
    private focused: Focused = "number";

    @observable
    private cardHolder: string = "";

    @observable
    private cardExpireDate: string = "";

    @observable
    private cardNumber: string = "";

    public render() {
        return (
            <>
                <Formik
                    initialValues={{}}
                    onSubmit={() => {/* @ts-ignore */ }}
                    render={() => (
                        <Form layout="vertical" className="signup-form payment-form">
                            <Divider orientation="left">Payment Card</Divider>

                            <Space direction="horizontal" align="center" size={30}>
                                <div style={{ userSelect: "none" }}>
                                    <Cards
                                        locale={{ valid: "дійсна до" }}
                                        cvc={-1}
                                        preview={true}
                                        focused={this.focused}
                                        acceptedCards={["visa", "visaelectron", "mastercard", "maestro", "discover"]}
                                        number={this.cardNumber}
                                        expiry={this.cardExpireDate}
                                        name={this.cardHolder} />

                                </div>
                                <div style={{ width: 533 }}>
                                    <Space direction="vertical" className="card-space" size={0}>
                                        <FormItem
                                            name="cardNumber"
                                            label="Card Number">
                                            <InputNumber
                                                size="large"
                                                style={{ width: "100%" }}
                                                name="cardNumber"
                                                onFocus={() => this.focused = "number"}
                                                onChange={(ev) => this.cardNumber = ev.toString().replace(/\D/g, "")}
                                                formatter={value => this.formatCardNumber(value)} />
                                        </FormItem>
                                        <Space direction="horizontal" size={20}>
                                            <FormItem
                                                name="cardHolder"
                                                label="Card Holder">
                                                <Input
                                                    onFocus={() => this.focused = "name"}
                                                    onChange={(ev) => this.cardHolder = ev.target.value}
                                                    style={{ width: 367 }} name="cardHolder" />
                                            </FormItem>
                                            <FormItem
                                                name="cardExpireDate"
                                                label="Valid Thru">
                                                <DatePicker
                                                    onFocus={() => this.focused = "expiry"}
                                                    onChange={(ev) => this.cardExpireDate = ev.format("YYMM")}
                                                    name="ExpireDate" picker="month" format="YY/MM" />
                                            </FormItem>
                                        </Space>
                                    </Space>
                                </div>
                            </Space>
                            <Divider orientation="left" type="horizontal">Tax Information</Divider>
                            <FormItem
                                label="Legal Name of Business"
                                name="beneficiaryName">
                                <Input name="beneficiaryName" />
                            </FormItem>
                            <FormItem
                                label="Currency"
                                name="currency">
                                <Select
                                    name="currency"
                                    style={{ width: 280 }}
                                    defaultValue={AllowedCurrency.UAH}>
                                    <Select.Option value={AllowedCurrency.USD}>Dollar USA <i>USD | $</i></Select.Option>
                                    <Select.Option value={AllowedCurrency.EUR}>Euro <i>EUR | €</i></Select.Option>
                                    <Select.Option value={AllowedCurrency.GBP}>Pound sterling <i>GBP | £</i></Select.Option>
                                    <Select.Option value={AllowedCurrency.UAH}>Українська Гривня <i>UAH | ₴</i></Select.Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                label="Remittance Information (optional)"
                                name="remittanceInfo">
                                <Input.TextArea name="remittanceInfo" maxLength={500} rows={4} />
                            </FormItem>
                            <Divider orientation="left" type="horizontal" dashed>Tax Comission</Divider>
                            <Typography.Paragraph>
                                <Link to="/">Make IT</Link> make guaranties to get you paid up to 7 business days.
                                <br />
                                <Link to="/">Make IT</Link> apply Tax Commission $30 USD per wire to any bank,
                                until you reach the minimum paid cost in your professional level.
                            </Typography.Paragraph>
                            <Typography.Paragraph type="secondary">
                                <dl>
                                    <li>
                                        <dt>Beginner Level</dt>
                                        <dd>Tax Commission after reaching minimum paid cost is &nbsp;&nbsp;5$ per wire to any bank</dd>
                                    </li>
                                    <li>
                                        <dt>Intermidiate Levels</dt>
                                        <dd>Tax Commission after reaching minimum paid cost is &nbsp;&nbsp;7$ per wire to any bank</dd>
                                    </li>
                                    <li>
                                        <dt>Senior Level</dt>
                                        <dd>Tax Commission after reaching minimum paid cost is 10$ per wire to any bank</dd>
                                    </li>
                                </dl>
                            </Typography.Paragraph>

                            <Divider orientation="left" type="horizontal" dashed />
                            <FormItem
                                name="attestation">
                                <Checkbox name="attestation">
                                    I attest that I am the owner and have full authorization to this bank account.
                                </Checkbox>
                            </FormItem>
                        </Form>
                    )} />
            </>
        );
    }

    private formatCardNumber(value: React.ReactText) {
        const groups = value.toString().replace(/\D/g, "").substring(0, 16).match(/.{1,4}/g) || [];
        return groups.join(" ");
    }
}

export default injectIntl(PaymentPanel);
