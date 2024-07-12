import React, { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";

import { APP_COLORS } from "../../styling/color";
import MediaCard from "../cards/media-card";
import { generateKey } from "../../utils/system";
import { CARD_MEDIA_LIST_STYLING } from "../../styling/cards";

const WIDTH = Dimensions.get("screen").width;

const VerticalMediasList = ({
  data = [],
  onShowImage,
  activeOpacityImage = 1,
}) => {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const ref = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const renderMedias = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[CARD_MEDIA_LIST_STYLING.container, { width: WIDTH }]}
        key={generateKey()}
        activeOpacity={activeOpacityImage}
        onPress={() => onShowImage && onShowImage(item)}
      >
        <MediaCard
          square
          squareValue={7}
          url={item?.url}
          imageKey={item?.code}
          radius={7}
        />
      </TouchableOpacity>
    ),
    [data]
  );

  const keyExtractor = useCallback((item) => generateKey(), [data]);

  const getItemLayout = (data, index = 0) => ({
    length: WIDTH,
    offset: WIDTH * index,
    index,
  });

  const renderMediasThumbnail = useMemo(
    () =>
      data?.map((media, index) => (
        <TouchableOpacity
          key={index}
          style={[
            CARD_MEDIA_LIST_STYLING.item_media,
            {
              borderWidth: 0, //activeIndex === index ? 1 :
              borderColor: APP_COLORS.PRIMARY_COLOR.color,
            },
          ]}
          onPress={() => {
            ref?.current?.scrollToIndex({
              animated: true,
              index: index,
              viewPosition: 0,
            });
          }}
        >
          <MediaCard
            square
            squareValue={50}
            url={media?.url}
            imageKey={media?.code}
            backgroundColor={APP_COLORS.LIGHT_COLOR.color}
          />
        </TouchableOpacity>
      )),
    [activeIndex]
  );

  return (
    <>
      <FlatList
        ref={ref}
        bounces={false}
        style={{ backgroundColor: "transparent", borderRadius: 7 }}
        disableIntervalMomentum
        data={data || []}
        renderItem={renderMedias}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        initialNumToRender={10}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        getItemLayout={getItemLayout}
        windowSize={10}
        disableVirtualization
        snapToInterval={WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        ListFooterComponent={null}
      />
      {Boolean(data?.length > 1) && (
        <View style={CARD_MEDIA_LIST_STYLING.footer_media}>
          <View style={CARD_MEDIA_LIST_STYLING.container_footer_medias}>
            {renderMediasThumbnail}
          </View>
        </View>
      )}
    </>
  );
};

export default React.memo(VerticalMediasList);
