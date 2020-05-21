declare module '*.svg' {
    import { CSSProperties } from "react";

    const svg: { width: number; height: number, style?: CSSProperties } | any;
    export default svg;
}
