declare module "*.svg" {
    import { CSSProperties, FC } from "react";
    const content: FC<{ width?: number; height?: number, style?: CSSProperties }>;

    export default content;
}

declare module "*.less" {
    const resource: { [key: string]: string };
    export = resource;
}
