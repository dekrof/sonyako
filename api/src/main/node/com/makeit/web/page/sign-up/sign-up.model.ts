import { inject, injectable } from "inversify";
import { action, observable } from 'mobx';

import { AxiosAuthenticationClient } from "@client/api-client";

import { AppModel } from "@page/app-layout";
import { UserModel } from "@page/sign-up/tab/user";
import { SkillModel } from "@page/sign-up/tab/skill";
import { AddressModel } from "@page/sign-up/tab/address";
import { FormikProps } from 'formik';
import { PaymentModel } from '@page/sign-up/tab/payment';

@injectable()
export class SignUpModel {

    constructor(
        @inject(AppModel) private appModel: AppModel,
        @inject(UserModel) private userModel: UserModel,
        @inject(SkillModel) private skillModel: SkillModel,
        @inject(AddressModel) private addressModel: AddressModel,
        @inject(PaymentModel) private paymentModel: PaymentModel,
        @inject(AxiosAuthenticationClient) private client: AxiosAuthenticationClient
    ) {
    }

    @observable
    public profileErrors: any = {};

    @observable
    public hasProfileErrors: boolean = false;

    @observable
    public addressErrors: any = {};

    @observable
    public hasAddressErrors: boolean = false;

    @observable
    public skillErrors: any = {};

    @observable
    public hasSkillErrors: boolean = false;

    @observable
    public paymentErrors: any = {};

    @observable
    public hasPaymentErrors: boolean = false;

    @observable
    public isTermAndConditionAccepted = false;

    @observable
    public isLoading = false;

    @action
    public async submitRegistration() {
        this.hasProfileErrors = await this.submitModel(this.userModel,    "profile", (errors) => this.profileErrors = errors);
        this.hasAddressErrors = await this.submitModel(this.addressModel, "address", (errors) => this.addressErrors = errors);
        this.hasPaymentErrors = await this.submitModel(this.paymentModel, "payment", (errors) => this.paymentErrors = errors);
        this.hasSkillErrors   = await this.submitSkills();

        if (!(this.profileErrors && this.addressErrors && this.hasPaymentErrors && this.hasSkillErrors)) {
            const address = this.addressModel.getAddress();
            const payment = this.paymentModel.getPayment();

            const registration = this.userModel.getRegistration();
            Object.assign(registration.profile, {address, payment});

            console.log(registration);
        }
    }

    private async submitModel<T>(model: { form: FormikProps<T> }, emptyForm: string, callback: (errors?: any) => void): Promise<boolean> {
        if (model.form) {
            const { submitForm } = model.form;

            await submitForm();
            const { isValid, errors } = model.form;
            callback(errors);
            return !isValid;
        } else {
            callback({ form: `User ${emptyForm} is empty` });
            return true;
        }
    }

    private async submitSkills() {
        if (this.skillModel.form) {
            const { submitForm } = this.skillModel.form;
            await submitForm();

            const { isValid, errors } = this.skillModel.form;
            this.skillErrors = errors;
            return !isValid;
        }
        return false;
    }
}
