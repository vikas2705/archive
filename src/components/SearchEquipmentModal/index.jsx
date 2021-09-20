import { useState } from "react";
import TabContainer from "../../components/TabContainer/index.jsx";
import SearchEquipmentBody from "../SearchEquipmentBody";
import EqpLocationAndWorkGroup from "../EqpLocationAndWorkGroup";
import LocationPlanningGroupSelect from "../LocationPlanningGroupSelect/index.jsx";

const tabsData = [
  {
    index: 1,
    title: "Eqp. Name & Code",
    active: true,
  },
  {
    index: 2,
    title: "Location & Work Group",
  },
];
export default function SearchEquipmentModal({ type, onSelect, value }) {
  const [activeTab, setActiveTab] = useState(1);

  const onTabChange = index => {
    setActiveTab(index);
  };

  //TODO: Merge into reusable component
  const renderGroupSelect = () => {
    if (type === 'equipment') {
      return (
        <EqpLocationAndWorkGroup
          onSelect={onSelect}
        />
      )
    }
    return (
      <LocationPlanningGroupSelect
        onSelect={onSelect}
      />
    )
  }
  return (
    <>
      <TabContainer
        tabsData={tabsData}
        activeTab={activeTab}
        onChange={onTabChange}
      />

      {activeTab === 1 ?
        <SearchEquipmentBody
          onSelect={onSelect}
          value={value}
          type={type}
        />
        :
        renderGroupSelect()
      }
    </>
  );
}
