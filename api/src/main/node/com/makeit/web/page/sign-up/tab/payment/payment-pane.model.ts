import { FormikProps } from "formik";
import { injectable, observable } from '@page/decorator';

export enum AllowedCurrency {
    USD = "USD", EUR = "EUR", UAH = "UAH", GBP = "GBP"
}

@injectable()
export class PaymentModel {

    public form: FormikProps<PaymentModel>;

    @observable
    public cardNumber: string;

    @observable
    public cardHolder: string;

    @observable
    public cardExpireDate: Date;

    @observable
    public beneficiaryName: string;

    @observable
    public currency: AllowedCurrency = AllowedCurrency.UAH;

    @observable
    public rate: number;

    @observable
    public remittanceInfo: string;

    @observable
    public attestation: boolean;
}
