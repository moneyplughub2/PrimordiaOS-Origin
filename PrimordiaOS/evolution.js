export function computePulse(m) {
    return Math.round(m.retention * 0.4 +
        m.completion * 0.3 +
        m.ctr * 0.2 +
        m.engagement * 0.1);
}
export async function maybePatchDefaults(pulse) {
    if (pulse < 60) {
        console.log("Patch required.");
    }
    else {
        console.log("System stable.");
    }
}
