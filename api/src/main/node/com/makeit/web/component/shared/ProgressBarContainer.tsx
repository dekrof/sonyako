import * as React from "react"

export const ProgressBarContainer = ({ children, isFinished, animationDuration }) => (
    <div style={{
        position: "absolute",
        top: 0,
        height: 2,
        opacity: isFinished ? 0 : 1,
        pointerEvents: "none",
        transition: `opacity ${animationDuration}ms linear`,
    }}>
        {children}
    </div>
);
