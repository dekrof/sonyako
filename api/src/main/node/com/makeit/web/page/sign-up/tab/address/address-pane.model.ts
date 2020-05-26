import { task } from "mobx-task";
import { FormikProps } from "formik";
import { memo } from "helpful-decorators";

import { inject, injectable, observable } from "@page/decorator";

import { CityType, StreetType } from "@client/api-client";
import { AxiosUkrposhtaClient } from "@client/ukrposhta-client";
import { Address } from '@client/api-client';

@injectable()
export class AddressModel {

    constructor(@inject(AxiosUkrposhtaClient) ukrposhta: AxiosUkrposhtaClient) {
        this.ukrposhta = ukrposhta;
    }

    private readonly ukrposhta: AxiosUkrposhtaClient;

    public form: FormikProps<AddressModel>;

    private id: number;

    @observable
    public countryCode: string;

    @observable
    public district: string;

    @observable
    public districtId: number;

    @observable
    public region: string;

    @observable
    public regionId: number;

    @observable
    public city: string;

    @observable
    public cityId: number;

    @observable
    public cityType: CityType = CityType.CITY;

    @observable
    public street: string;

    @observable
    public streetId: number;

    @observable
    public streetType: StreetType = StreetType.STREET;

    @observable
    public houseNumber: string;

    @observable
    public postalCode: string;

    @observable
    public entranceAndAppparaments: string;

    @observable
    public location: number[];

    @task @memo()
    public async getRegions() {
        return this.ukrposhta.getRegions();
    }

    @task @memo()
    public async getDistricts(regionId: number) {
        return this.ukrposhta.getDistricts(regionId);
    }

    @task
    public async getCities(regionId: number, districtId: number, cityName: string) {
        return this.ukrposhta.getCities(regionId, districtId, cityName);
    }

    @task
    public async getStreets(regionId: number, districtId: number, cityId: number, streetName: string) {
        return this.ukrposhta.getStreets(regionId, districtId, cityId, streetName);
    }

    @task
    public async getPostalCodes(streetId: number) {
        return this.ukrposhta.getPostalCodes(streetId);
    }

    public validateRegion(): string {
        return this.region
            ? null
            : "Region is not selected";
    }

    public validateState(): string {
        return this.district
            ? null
            : "District is not selected";
    }

    public validateCity(): string {
        return this.city && this.cityType
            ? null
            : "City is not selected, or not completely filled";
    }

    public validateStreet(): string {
        return this.street && this.streetType && this.houseNumber
            ? null
            : "Street is not selected, or not completely filled";
    }

    public validatePostalCode(): string {
        if (this.postalCode) {
            if (this.postalCode.length === 5 && this.postalCode.replace(/\D+/g, "").length === 5) {
                return null;
            }
            return "Postal Code has invalid format";
        } else {
            return "Postal Code should not be empty";
        }
    }

    public validateLocation(): string {
        return this.location
            ? null
            : "Location is not selected";
    }

    public toAddress(): Address {
        return {
            id: this.id,
            countryCode: this.countryCode || "UA",
            city: this.city,
            cityType: this.cityType,
            region: this.region,
            district: this.district,
            street: this.street,
            streetType: this.streetType,
            houseNumber: this.houseNumber,
            postalCode: this.postalCode
        } as Address;
    }
}
