"use client";
import { useEffect, useRef } from "react";
import { initOverlay } from "@/lib/overlay";
export default function OverlayCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current)
            initOverlay(ref.current);
    }, []);
    return (<canvas ref={ref} className="pointer-events-none absolute inset-0"/>);
}
