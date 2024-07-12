import { View, Text } from "react-native";
import React from "react";
import { QUICK_RECAP_CARD_STYLING } from "../../styling/cards";
import { APP_COLORS } from "../../styling/color";
import { formatPrice } from "../../utils/system";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";

export default function QuickRecapCard({
  label = "",
  count = 0,
  backgroundColor = APP_COLORS.PRIMARY_COLOR.color,
}) {
  return (
    <View
      style={[
        QUICK_RECAP_CARD_STYLING.container,
        {
          backgroundColor,
        },
      ]}
    >
      <View style={[QUICK_RECAP_CARD_STYLING.section, {
        flex: 2
      }]}>
        
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={QUICK_RECAP_CARD_STYLING.count} adjustsFontSizeToFit>
            {formatPrice(`${count}`)}
          </Text>
        </View>
      </View>
      <View style={[QUICK_RECAP_CARD_STYLING.section, { flexDirection: "row", alignItems: "center"}]}>
        <Text style={{ }}>
            <SimpleLineIcons name="graph" size={36} color={APP_COLORS.BLACK_COLOR.color} />
        </Text>
        <View style={{ marginLeft: 5, flex: 1, justifyContent: "center"}}>
            <Text style={QUICK_RECAP_CARD_STYLING.label}>{label}</Text>
        </View>
      </View>
    </View>
  );
}
