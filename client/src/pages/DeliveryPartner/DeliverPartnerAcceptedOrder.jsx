import PartnerHeader from "../../components/DeliveryPartner/Layout/PartnerHeader";
import PartnerSidebar from "../../components/DeliveryPartner/Layout/PartnerSidebar";
import PartnerAcceptedOrder from "../../components/DeliveryPartner/PartnerAcceptedOrder";

const DeliverPartnerAcceptedOrder = () => {
  return (
    <div>
      <PartnerHeader />
      <div className="flex w-full">
        <div className="flex items-start w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <PartnerSidebar active={3} />
          </div>
          <div className="flex justify-center w-full">
            <PartnerAcceptedOrder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverPartnerAcceptedOrder;
