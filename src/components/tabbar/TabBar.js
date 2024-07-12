// TabBar.js

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native";
import { TAB_BAR_STYLE } from "../../styling/tab";
import { APP_COLORS } from "../../styling/color";


const TabBar = ({ tabs = [], activeTab, onTabPress }) => {
  return (
    <ScrollView style={{}} horizontal showsHorizontalScrollIndicator={false}>
      {tabs.map((data, index) => (
        <TouchableOpacity
          style={[TAB_BAR_STYLE.main, {}]}
          onPress={() => onTabPress(index)}
          key={data.code}
        >
          <View
            style={[
              TAB_BAR_STYLE.over_container,
              {
                borderColor:
                  activeTab === index
                    ? APP_COLORS.PRIMARY_COLOR.color
                    : APP_COLORS.LIGHT_COLOR.color,
              },
            ]}
          >
            <View
              style={[
                TAB_BAR_STYLE.container,
                {
                  backgroundColor:
                    activeTab === index
                      ? APP_COLORS.WHITE_COLOR.color
                      : APP_COLORS.LIGHT_COLOR.color,
                },
              ]}
            >
              <Text
                style={[
                  TAB_BAR_STYLE.pseudo,
                  {
                    color:
                    activeTab === index
                      ? APP_COLORS.PRIMARY_COLOR.color
                      : APP_COLORS.BLACK_COLOR.color,
                  },
                ]}
              >
                {data?.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TabBar;
