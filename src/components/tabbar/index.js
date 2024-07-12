// App.js

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import TabBar from "./TabBar";
import Section from "./Section";

const CustomTabBar = ({
  tabs = [],
  navigation,
  account,
  filterCategories = [],
  onChangeTab,
  defaultActiveTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0);

  const renderContent = useCallback(
    () => (
      <Section
        tabLabel={{
          label: tabs?.length ? tabs[activeTab]?.name : "",
        }}
        section={Boolean(tabs?.length) && tabs[activeTab]}
        key={Boolean(tabs?.length) && tabs[activeTab].code}
        navigation={navigation}
        filterCategories={filterCategories}
      />
    ),
    [activeTab, filterCategories]
  );
  const onChangeActiveTab = (index) => {
    try {
      setActiveTab(index);
      onChangeTab({ position: index });
    } catch (error) {}
  };
  return (
    <View style={{ flex: 1, paddingTop: 4 }}>
      <View style={{ marginBottom: 10 }}>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(index) => onChangeActiveTab(index)}
        />
      </View>
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );
};

export default CustomTabBar;
