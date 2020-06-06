import { FormikProps } from "formik";
import { injectable, observable } from '@page/decorator';
import { CurrencyType, Payment } from "@client/api-client";

@injectable()
export class PaymentModel {

    public form: FormikProps<PaymentModel>;

    @observable
    public cardNumber: string;

    @observable
    public cardHolder: string;

    @observable
    public cardExpireDate: string;

    @observable
    public beneficiaryName: string;

    @observable
    public currency: CurrencyType = CurrencyType.UAH;

    @observable
    public rate: number;

    @observable
    public remittanceInfo: string;

    @observable
    public attestation: boolean;

    public validateCardNumber(value: number | string): string {
        if (value) {
            value = value.toString();
            if (value.trim().replace(/\D+/g, "").length !== 16) {
                return "Invalid credit card number";
            }
        } else {
            return "Credit Card Number should not be empty";
        }
        return null;
    }

    public validateCardHolder(value: string): string {
        if (!value || value && value.trim().length === 0) {
            return "Credit Card Number should not be empty";
        }
        return null;
    }

    public validateCardExpireDate(): string {
        if (!this.cardExpireDate) {
            return "Expire Date is empty";
        }
        if (this.cardExpireDate) {
            if (this.cardExpireDate.trim().replace(/\D+/g, "").length !== 4) {
                return "Expire Date is not valid";
            } else {
                const now = new Date();
                now.setDate(0)
                now.setHours(0, 0, 0, 0);

                const parts = this.cardExpireDate
                    .match(/.{1,2}/g)
                    .map((part, it) => parseInt(it === 0 ? "20" + part : part, 10));

                const cardDate = new Date();
                cardDate.setFullYear(parts[0]);
                cardDate.setMonth(parts[1] - 1);
                cardDate.setDate(0)
                cardDate.setHours(0, 0, 0, 0);

                if (cardDate.getTime() - now.getTime() < 0) {
                    return "Credit Card expired";
                }
            }
        }
        return null;
    }

    public validateBeneficiaryName(value: string): string {
        if (!value || value && value.trim().length === 0) {
            return "Legal Name of Business should not be empty";
        }
        return null;
    }

    public validateRate(value: number): string {
        if (!value || value <= 0) {
            return "Base rate should not be zero or negative";
        }
        return null;
    }

    public validateAttestation(value: boolean): string {
        if (!value) {
            return "You need to attest you data before send";
        }
        return null;
    }

    public getPayment(): Payment {
        return {
            attestation: this.attestation,
            beneficiaryName: this.beneficiaryName,
            cardExpireDate: this.cardExpireDate,
            cardHolder: this.cardHolder,
            cardNumber: this.cardNumber,
            currency: this.currency,
            rate: this.rate,
            remittanceInfo: this.remittanceInfo
        } as Payment
    }
}
