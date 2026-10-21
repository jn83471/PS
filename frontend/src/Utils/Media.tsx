export const hasCamera = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        return devices.some(
            device => device.kind === "videoinput"
        );
    } catch {
        return false;
    }
};

export const isMobile =
    /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );

export const isMobileOnly = window.innerWidth < 768;
export const isTabletOnly =
    window.innerWidth >= 768 &&
    window.innerWidth < 1024;
export const isDesktopOnly =
    window.innerWidth >=1024;