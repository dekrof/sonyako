import axios from "axios";
import "reflect-metadata";
import { injectable } from "inversify";
import { AxiosInstance, AxiosRequestConfig, AxiosHttpClient, HttpClient, uriEncoding } from "@client/base-client";

type ArrayMutation = "splice" | "push" | "pop" | "shift" | "unshift"

type FixedArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<TObj, Exclude<keyof TObj, ArrayMutation>> & {
    readonly length: L
    [I: number]: T
    [Symbol.iterator]: () => IterableIterator<T>
}

type ItemType = "Feature" | "FeatureCollection";

type FeatureProperties = {
    name: string;
    categories: string;
    relevance: number;
    dist_meters?: number;
    street_url?: string;
    settlement_url?: string;
}

type Feature = {
    type: "Feature" | string;
    id: string;
    properties: FeatureProperties;
    bbox?: FixedArray<number, 4>;
    geo_centroid?: { type: "Point" | string; coordinates: FixedArray<number, 2> }
    url: string;
}

type FeatureCollection = {
    type: "FeatureCollection" | string;
    features: Feature[];
}

export class Location {
    longitude: number;
    latitude: number;

    public static fromData(data: Feature | FeatureCollection): Location {
        if (!data) {
            return null;
        }

        const mapper = (feature: Feature) => {
            const [longitude, latitude] = feature?.geo_centroid?.coordinates;
            const that = new Location();

            that.longitude = longitude;
            that.latitude = latitude;

            return that;
        }

        if (data.type === "Feature") {
            return mapper(data as Feature);
        }

        if (data.type === "FeatureCollection") {
            return mapper((data as FeatureCollection).features[0])
        }
    }
}

@injectable()
export class AxiosVisicomClient {

    protected readonly httpClient: HttpClient<AxiosRequestConfig>;

    constructor() {
        const axiosInstance: AxiosInstance = axios.create();
        axiosInstance.defaults.baseURL = process.env.VISICOM;
        this.httpClient = new AxiosHttpClient(axiosInstance);
    }

    public async getLocation(locale: string, text: string, options?: AxiosRequestConfig): Promise<Location> {
        const url = uriEncoding`/${locale}/geocode.json`
        const queryParams = {
            text, key: process.env.VISICOM_TOKEN
        }

        return this.httpClient
            .request<Feature | FeatureCollection>({ method: "GET", url, options, queryParams })
            .then(({ data }) => Location.fromData(data));
    }
}
