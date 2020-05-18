import { observable } from "mobx";
import { task } from "mobx-task";
import { memo } from "helpful-decorators";
import { inject, injectable } from "@ioc/app-module-decorator";
import { StreetType, CityType } from "@client/api-client";
import { AxiosUkrposhtaClient } from "@client/ukrposhta-client";

@injectable()
export class AddressModel {

    private readonly ukrposhta: AxiosUkrposhtaClient;

    constructor(@inject(AxiosUkrposhtaClient) ukrposhta: AxiosUkrposhtaClient) {
        this.ukrposhta = ukrposhta;
    }

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
    public cityType: CityType;

    @observable
    public street: string;

    @observable
    public streetId: number;

    @observable
    public streetType: StreetType;

    @observable
    public houseNumber: string;

    @observable
    public postalCode: string;

    @observable
    public entranceAndAppparaments: string;

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
}
