import * as React from "react";
import MapGL, { DragEvent, Marker } from "react-map-gl";
import { geolocated, GeolocatedProps } from "react-geolocated";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { flow } from "mobx";
import { delay, once } from "helpful-decorators";

import { notification, Popconfirm } from "antd";

import { Icons } from "@component/address";
import { AddressModel } from "@page/sign-up/tab/address";
import { observable, observer, resolve } from "@page/decorator";
import { AxiosVisicomClient, Location } from "@client/visicom-client";

interface LocationInputProps extends WrappedComponentProps, GeolocatedProps {
    postalCode?: string;
}

type Coords = {
    longitude: number;
    latitude: number;
}

type Viewport = {
    pitch: number;
    zoom: number;
} & any & Coords;

const buildingLayer = {
    "id": "3d-buildings",
    "source": "composite",
    "source-layer": "building",
    "filter": ["==", "extrude", "true"],
    "type": "fill-extrusion",
    "minzoom": 15,
    "paint": {
        "fill-extrusion-color": "#fff5d9",
        "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"]
        ],
        "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"]
        ],
        "fill-extrusion-opacity": 0.6
    }
};

@observer
class LocationInput extends React.Component<LocationInputProps> {

    @resolve
    private model: AddressModel;

    @resolve
    private visicom: AxiosVisicomClient;

    @observable
    private showLocationConfirm: boolean = false;

    @observable
    private marker: Coords = {
        longitude: Number(process.env.LON),
        latitude: Number(process.env.LAT)
    }

    @observable
    private viewport: Viewport = {
        longitude: Number(process.env.LON),
        latitude: Number(process.env.LAT),
        pitch: 25,
        zoom: 12
    }

    public componentDidMount() {
        if (!this.props.isGeolocationEnabled) {
            notification.open({
                message: "Turn on Geolocation",
                description: "Please turn on geolocation to automatically detect your address",
                icon: <Icons.UserNavigator width={30} height={30}/>
            });
        } else {
            const closer = setInterval(() => this.updateViewport(closer), 500);
        }
    }

    private updateViewport(closer: any) {
        const {coords} = this.props;
        if (coords) {
            const {latitude, longitude} = coords;
            this.viewport.longitude = longitude;
            this.viewport.latitude = latitude;
            this.marker = this.viewport;

            clearInterval(closer);
        }
    }

    private receiveLocation = flow(function* () {
        const {intl} = this.props;
        if (this.model.postalCode) {
            const text = `${this.model.postalCode}, ${this.model.city}, ${this.model.street} ${this.model.houseNumber}`;
            const location: Location = yield this.visicom.getLocation(intl.locale, text);
            if (location) {
                this.viewport.latitude = location.latitude;
                this.viewport.longitude = location.longitude;
                this.viewport.zoom = 17;

                this.marker = this.viewport;
            }
        }
    }.bind(this));

    private handleMarkerDragEnd = (event: DragEvent) => {
        const [longitude, latitude] = event.lngLat;
        this.marker.longitude = longitude;
        this.marker.latitude = latitude;

        this.popLocationConfirm();
    };

    @once
    private configureMap(ev: { target: any }) {
        const map = ev.target;
        const layers = map.getStyle().layers;

        let labelLayerId: string;

        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer(buildingLayer, labelLayerId);
    }

    @delay(300)
    private popLocationConfirm() {
        this.showLocationConfirm = true;
    }

    private confirmLocation() {
        this.showLocationConfirm = false;
    }

    private declineLocation() {
        this.showLocationConfirm = false;
    }

    public UNSAFE_componentWillReceiveProps(nextProps: LocationInputProps) {
        if (nextProps.postalCode && this.props.postalCode !== nextProps.postalCode) {
            this.receiveLocation();
        }
    }

    public render() {
        return (
            <div className="address-form-map-wrapper ant-input">
                <MapGL {...this.viewport}
                       width="100%"
                       height="calc(100vh / 2)"
                       maxPitch={85}
                       mapStyle={process.env.MAP_STYLE}
                       onLoad={ev => this.configureMap(ev)}
                       onViewportChange={(vieport: Viewport) => {
                           this.viewport = vieport;
                           this.showLocationConfirm = false;
                       }}
                       mapboxApiAccessToken={process.env.TOKEN}>
                    <div>
                        <Popconfirm
                            style={{width: 400}}
                            icon={<Icons.UserNavigator width={30} height={30}/>}
                            title="Are you sure you want to change your location?"
                            visible={this.showLocationConfirm}
                            onConfirm={() => this.confirmLocation()}
                            onCancel={() => this.declineLocation()}
                            okText="Yes, I'm sure"
                            cancelText="Not now"
                        >
                            <Marker
                                {...this.marker}
                                draggable={true}
                                offsetTop={-20}
                                offsetLeft={-20}
                                onDragEnd={(ev: DragEvent) => this.handleMarkerDragEnd(ev)}>
                                <Icons.MapPointer width={40} height={40}/>
                            </Marker>
                        </Popconfirm>
                    </div>
                </MapGL>
            </div>
        );
    }
}

export default geolocated()(injectIntl(LocationInput));
