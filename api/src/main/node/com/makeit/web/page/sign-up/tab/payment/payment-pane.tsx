import * as React from "react";
import { Link } from "react-router-dom";
import { WrappedComponentProps, injectIntl } from "react-intl";

import { Divider, Space, Typography } from "antd";
import Cards, { Focused } from "react-credit-cards";

import { Formik } from "formik";
import { Form, FormItem, Input, InputNumber, DatePicker, Checkbox, Select } from "formik-antd";

import { observer, observable, resolve } from "@page/decorator";
import { PaymentModel, AllowedCurrency } from '@page/sign-up/tab/payment';

import "@css/credit-cards.less";

@observer
class PaymentPanel extends React.Component<WrappedComponentProps> {

    @resolve
    private model: PaymentModel;

    @observable
    private focused: Focused = "number";

    public render() {
        return (
            <>
                <Formik initialValues={this.model} onSubmit={(_values, helpers) => helpers.setSubmitting(false)}>
                    {
                        (props) => (
                            <Form layout="vertical" className="signup-form payment-form">
                                {
                                    (() => {
                                        // the workaraout to fix the bag of formik
                                        this.model.form = props;
                                        return null;
                                    })()
                                }
                                <Divider orientation="left">Payment Card</Divider>
                                <Space direction="horizontal" align="center" size={30}>
                                    <div style={{ userSelect: "none" }}>
                                        <Cards
                                            locale={{ valid: "дійсна до" }}
                                            cvc={-1}
                                            preview={true}
                                            focused={this.focused}
                                            acceptedCards={["visa", "visaelectron", "mastercard", "maestro", "discover"]}
                                            number={this.model.cardNumber || ""}
                                            expiry={this.model.cardExpireDate || ""}
                                            name={this.model.cardHolder || ""} />

                                    </div>
                                    <div style={{ width: 533 }}>
                                        <Space direction="vertical" className="card-space" size={0}>
                                            <FormItem
                                                name="cardNumber"
                                                validate={value => this.model.validateCardNumber(value)}
                                                label="Card Number">
                                                <InputNumber
                                                    size="large"
                                                    style={{ width: "100%" }}
                                                    name="cardNumber"
                                                    onFocus={() => this.focused = "number"}
                                                    onChange={(ev) => this.model.cardNumber = ev?.toString().trim().replace(/\D/g, "")}
                                                    formatter={value => this.formatCardNumber(value)} />
                                            </FormItem>
                                            <Space direction="horizontal" size={20}>
                                                <FormItem
                                                    name="cardHolder"
                                                    validate={value => this.model.validateCardHolder(value)}
                                                    label="Card Holder">
                                                    <Input
                                                        onFocus={() => this.focused = "name"}
                                                        onChange={(ev) => this.model.cardHolder = ev.target.value}
                                                        style={{ width: 367 }} name="cardHolder" />
                                                </FormItem>
                                                <FormItem
                                                    name="cardExpireDate"
                                                    validateTrigger={["change", "blur", "focus"]}
                                                    validate={() => this.model.validateCardExpireDate()}
                                                    label="Valid Thru">
                                                    <DatePicker
                                                        onFocus={() => this.focused = "expiry"}
                                                        onChange={(ev) => this.model.cardExpireDate = ev.format("YYMM")}
                                                        name="ExpireDate" picker="month" format="YY/MM" />
                                                </FormItem>
                                            </Space>
                                        </Space>
                                    </div>
                                </Space>
                                <Divider orientation="left" type="horizontal">Tax Information</Divider>
                                <FormItem
                                    label="Legal Name of Business"
                                    validate={value => this.model.validateBeneficiaryName(value)}
                                    name="beneficiaryName">
                                    <Input
                                        name="beneficiaryName"
                                        onChange={ev => this.model.beneficiaryName = ev.currentTarget.value} />
                                </FormItem>
                                <FormItem
                                    label="Currency"
                                    name="currency">
                                    <Select
                                        name="currency"
                                        style={{ width: 280 }}
                                        defaultValue={AllowedCurrency.UAH}
                                        onChange={ev => this.model.currency = ev}>
                                        <Select.Option value={AllowedCurrency.USD}>Dollar USA <i>USD | $</i></Select.Option>
                                        <Select.Option value={AllowedCurrency.EUR}>Euro <i>EUR | €</i></Select.Option>
                                        <Select.Option value={AllowedCurrency.GBP}>Pound sterling <i>GBP | £</i></Select.Option>
                                        <Select.Option value={AllowedCurrency.UAH}>Українська Гривня <i>UAH | ₴</i></Select.Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="Base Rate"
                                    validate={value => this.model.validateRate(value)}
                                    name="rate">
                                    <InputNumber
                                        name="rate"
                                        style={{ width: 280 }}
                                        onChange={ev => this.model.rate = Number(ev?.toString().trim())} />
                                </FormItem>
                                <FormItem
                                    label="Remittance Information (optional)"
                                    name="remittanceInfo">
                                    <Input.TextArea
                                        name="remittanceInfo"
                                        maxLength={500}
                                        rows={4}
                                        onChange={ev => this.model.remittanceInfo = ev.currentTarget.value?.trim()}
                                    />
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
                                    validate={value => this.model.validateAttestation(value)}
                                    name="attestation">
                                    <Checkbox
                                        name="attestation"
                                        onChange={ev => this.model.attestation = ev.target.checked}>
                                        I attest that I am the owner and have full authorization to this bank account.
                                </Checkbox>
                                </FormItem>
                            </Form>
                        )
                    }
                </Formik>
            </>
        );
    }

    private formatCardNumber(value: React.ReactText) {
        const groups = value?.toString().replace(/\D/g, "").substring(0, 16).match(/.{1,4}/g) || [];
        return groups.join(" ");
    }
}

export default injectIntl(PaymentPanel);
