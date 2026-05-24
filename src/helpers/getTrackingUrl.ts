export const getTrackingUrl = (trackingNumber: string) => {
    return `https://www.ups.com/track?loc=en_US&requester=QUIC&tracknum=${trackingNumber}/trackdetails`;
};