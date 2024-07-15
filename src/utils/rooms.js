import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export const ROOM_STATUS = {
  AVAILABLE: "AVAILABLE",
  TAKEN: "TAKEN",
};

export const ROOM_STATUS_TRADUCTION = {
  AVAILABLE: "Disponible",
  TAKEN: "Occupée",
};

export const ROOM_PROPERTIES = {
  Air_Conditioner: "Air_Conditioner",
  Toilet: "Toilet",
  Wifi: "Wifi",
  Balcony: "Balcony",
  Parking: "Parking",
  TV: "TV",
  Fan: "Fan",
};

export const ROOM_PROPERTIES_TRADUCTION = {
  Air_Conditioner: "Climatisation",
  Toilet: "Toilette",
  Wifi: "Wifi",
  Balcony: "Balcon",
  Parking: "Parking",
  TV: "TV",
  Fan: "Ventilateur"
};

export const getRoomPropertyIcon = (property, color = "#000", size = 24) => {
  try {
    switch (property) {
      case ROOM_PROPERTIES.Air_Conditioner:
        return (
          <MaterialCommunityIcons
            name="air-conditioner"
            size={size}
            color={color}
          />
        );
      case ROOM_PROPERTIES.Toilet:
        return <FontAwesome5 name="toilet" size={size} color={color} />;
      case ROOM_PROPERTIES.Balcony:
        return <MaterialIcons name="balcony" size={size} color={color} />;
      case ROOM_PROPERTIES.Parking:
        return <FontAwesome5 name="parking" size={size} color={color} />;
      case ROOM_PROPERTIES.TV:
        return <FontAwesome5 name="tv" size={size} color={color} />;
      case ROOM_PROPERTIES.Wifi:
        return <AntDesign name="wifi" size={size} color={color} />;
        case ROOM_PROPERTIES.Fan:
          return <MaterialCommunityIcons name="fan" size={size} color={color} />;
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
};


export const canViewRoomInfos = (role, house, company) => {
  
}