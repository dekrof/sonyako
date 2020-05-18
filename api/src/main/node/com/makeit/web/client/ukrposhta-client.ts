import axios from "axios";
import "reflect-metadata";
import { injectable } from "inversify";
import { AxiosInstance, AxiosRequestConfig, AxiosHttpClient, HttpClient, uriEncoding } from "@client/base-client";

type RegionType = {
    REGION_ID: string;
    REGION_UA: string;
    REGION_EN: string;
    REGION_RU: string;
}

type DistrictType = {
    REGION_ID: string;
    DISTRICT_ID: string;
    DISTRICT_UA: string;
    DISTRICT_EN: string;
    DISTRICT_RU: string;
}

type CityType = {
    REGION_ID: string;
    DISTRICT_ID: string;
    CITY_ID: string;
    CITY_UA: string;
    CITY_EN: string;
    CITY_RU: string;
}

type StreetType = {
    REGION_ID: string;
    DISTRICT_ID: string;
    CITY_ID: string;
    STREET_ID: string;
    STREET_UA: string;
    STREET_EN: string;
    STREET_RU: string;
}

type PostalCodeType = {
    STREET_ID: string;
    POSTCODE: string;
    HOUSENUMBER_UA: string;
}

type ListResponse<T> = {
    Entries: {
        Entry: T[];
    };
}

export class Region {
    public id: number;
    public name: {
        uk: string;
        en: string;
        ru: string;
    }

    public static fromData(data: RegionType): Region {
        if (!data) {
            return null;
        }

        const that = new Region();
        that.id = Number(data.REGION_ID);
        that.name = {
            uk: data.REGION_UA,
            en: data.REGION_EN,
            ru: data.REGION_RU
        }

        return that;
    }
}

export class District {
    public id: number;
    public regionId: number;
    public name: {
        uk: string;
        en: string;
        ru: string;
    }

    public static fromData(data: DistrictType): District {
        if (!data) {
            return null;
        }

        const that = new District();
        that.id = Number(data.DISTRICT_ID);
        that.regionId = Number(data.REGION_ID);
        that.name = {
            uk: data.DISTRICT_UA,
            en: data.DISTRICT_EN,
            ru: data.DISTRICT_RU
        }

        return that;
    }
}

export class City {
    public id: number;
    public regionId: number;
    public districtId: number;
    public name: {
        uk: string;
        en: string;
        ru: string;
    }

    public static fromData(data: CityType): City {
        if (!data) {
            return null;
        }

        const that = new City();
        that.id = Number(data.CITY_ID);
        that.districtId = Number(data.DISTRICT_ID);
        that.regionId = Number(data.REGION_ID);
        that.name = {
            uk: data.CITY_UA,
            en: data.CITY_EN,
            ru: data.CITY_RU
        }

        return that;
    }
}

export class Street {
    public id: number;
    public cityId: number;
    public regionId: number;
    public districtId: number;
    public name: {
        uk: string;
        en: string;
        ru: string;
    }

    public static fromData(data: StreetType): Street {
        if (!data) {
            return null;
        }

        const that = new Street();
        that.id = Number(data.STREET_ID);
        that.cityId = Number(data.CITY_ID);
        that.districtId = Number(data.DISTRICT_ID);
        that.regionId = Number(data.REGION_ID);
        that.name = {
            uk: data.STREET_UA,
            en: data.STREET_EN,
            ru: data.STREET_RU
        }

        return that;
    }
}

export class PostalCode {
    public streetId: number;
    public postcode: string;
    public houseNumber: string;

    public static fromData(data: PostalCodeType): PostalCode {
        if (!data) {
            return null;
        }

        const that = new PostalCode();
        that.streetId = Number(data.STREET_ID);
        that.postcode = data.POSTCODE;
        that.houseNumber = data.HOUSENUMBER_UA;

        return that;
    }
}

@injectable()
export class AxiosUkrposhtaClient {

    private readonly httpClient: HttpClient<AxiosRequestConfig>;

    constructor() {
        const axiosInstance: AxiosInstance = axios.create({
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });

        axiosInstance.defaults.baseURL = process.env.UKRPOSHTA;

        this.httpClient = new AxiosHttpClient(axiosInstance);
    }

    public async getRegions(options?: AxiosRequestConfig): Promise<Region[]> {
        const url = uriEncoding`/get_regions_by_region_ua`;
        return this.httpClient
            .request<ListResponse<RegionType>>({ method: "GET", url, options })
            .then(({ data }) => data.Entries.Entry.map((that: RegionType) => Region.fromData(that)));
    }

    public async getDistricts(regionId: number, options?: AxiosRequestConfig): Promise<District[]> {
        const queryParams = { region_id: regionId };
        const url = uriEncoding`/get_districts_by_region_id_and_district_ua`;

        return this.httpClient
            .request<ListResponse<DistrictType>>({ method: "GET", url, options, queryParams })
            .then(({ data }) => data.Entries.Entry.map((that: DistrictType) => District.fromData(that)));
    }

    public async getCities(regionId: number, districtId: number, cityName: string, options?: AxiosRequestConfig): Promise<City[]> {
        const queryParams = {
            region_id: regionId,
            district_id: districtId,
            city_ua: cityName
        };
        const url = uriEncoding`/get_city_by_region_id_and_district_id_and_city_ua`;

        return this.httpClient
            .request<ListResponse<CityType>>({ method: "GET", url, options, queryParams })
            .then(({ data }) => data.Entries.Entry.map((that: CityType) => City.fromData(that)));
    }

    public async getStreets(regionId: number, districtId: number, cityId: number, streetName: string, options?: AxiosRequestConfig): Promise<Street[]> {
        const queryParams = {
            region_id: regionId,
            district_id: districtId,
            city_id: cityId,
            street_ua: streetName
        };
        const url = uriEncoding`/get_street_by_region_id_and_district_id_and_city_id_and_street_ua`;

        return this.httpClient
            .request<ListResponse<StreetType>>({ method: "GET", url, options, queryParams })
            .then(({ data }) => data.Entries.Entry.map((that: StreetType) => Street.fromData(that)));
    }

    public async getPostalCodes(streetId: number, options?: AxiosRequestConfig): Promise<PostalCode[]> {
        const queryParams = { street_id: streetId };
        const url = uriEncoding`/get_addr_house_by_street_id`;

        return this.httpClient
            .request<ListResponse<PostalCodeType>>({ method: "GET", url, options, queryParams })
            .then(({ data }) => data.Entries.Entry.map((that: PostalCodeType) => PostalCode.fromData(that)));
    }
}
