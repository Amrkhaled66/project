const getUpsTrackingLink = (trackingNumber: string) => {
  return `https://www.ups.com/track?loc=en_US&requester=QUIC&tracknum=${trackingNumber}/trackdetails`;
};
export default getUpsTrackingLink;
