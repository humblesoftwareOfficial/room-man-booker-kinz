import React from "react";
import { StyleSheet } from "react-native";

import { isFieldWithValue } from "../../utils/system";
import CachedImage from "../medias/cached-image";

const MediaCard = ({
  url,
  square,
  squareValue = 50,
  radius = 0,
  isVideo = false,
  videoWidth,
  showVideo,
  onImageLoaded,
  forStory = false,
  flex = 1,
  videoRadius = 0,
  hideVideoPlayButton = false,
  imageKey = "",
  backgroundColor = "#FFF",
  activeExtraRadius = false,
}) => {
  return (
    <>
      {Boolean(isFieldWithValue(url)) ? (
        <CachedImage
          source={{ uri: url }}
          style={[
            styles.image,
            {
              borderRadius: square ? squareValue : radius,
              ...(forStory && {
                justifyContent: "center",
                alignItems: "center",
              }),
              resizeMode: forStory ? "contain" : "cover",
              flex: flex,
              backgroundColor,
            },
          ]}
          thumbnailSource={{ uri: url }}
          square={square}
          squareValue={squareValue}
          radius={radius}
          onLoadEnd={() => onImageLoaded && onImageLoaded()}
          flex={flex}
          backgroundColor={backgroundColor}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: 200,
    height: 50
  },
  square: {
    borderRadius: 50,
  },
});

export default React.memo(MediaCard);
