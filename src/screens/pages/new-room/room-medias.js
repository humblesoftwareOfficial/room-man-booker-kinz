import { View, Text, Modal, Dimensions, ScrollView, Alert } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import NewRoomContext from "../../../config/contexts/new-room";
import { newItemMedia } from "../../../config/contexts/new-room-provider";
import { NEW_ROOM_STYLE, SELECT_MEDIAS_STYLE } from "../../../styling/rooms";
import CustomButton from "../../../components/buttons/custom-button";
import { APP_COLORS } from "../../../styling/color";
import { isFieldWithValue } from "../../../utils/system";
import ImageRoomPicker from "../../../components/medias/image-room-picker";
// import ImagesPicker from "../../../components/medias/images-picker";

const DEFAULT_MEDIA_WIDTH = Math.ceil(Dimensions.get("window").width / 1.9);
const PRODUCT_MEDIA_HEIGHT = Math.ceil(Dimensions.get("window").height / 3);

export default function RoomMedias({
  onNext,
  onBack,
  limit = 10,
  customButtonTtile = "Suivant",
  withCloseButton = false,
}) {
  const { medias, setMedias } = useContext(NewRoomContext);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const onValidateImagesSelection = (data) => {
    const newImages = new Array(10)
      .fill(undefined)
      .map((_, idx) => newItemMedia(idx)); //medias ||
    data?.map((image, index) => {
      newImages[index].image = image;
    });
    setMedias([...newImages]);
    onClose();
  };

  const onImagePicked = (data, index) => {
    try {
      const { assets } = data;
      let newImages = medias;
      if (!newImages.length) {
        newImages = new Array(10)
          .fill(undefined)
          .map((_, idx) => newItemMedia(idx));
      }
      newImages[index].image = {
        uri: assets[0].uri,
        base64: assets[0].base64,
      };
      setMedias([...newImages]);
    } catch (error) {
      console.log({ error });
    }
  };

  const onValidImages = () => {
    const hasSelectedOneImage = medias?.some((m) =>
      isFieldWithValue(m?.image?.uri)
    );
    if (hasSelectedOneImage) {
      onNext();
    } else {
      Alert.alert("Veuillez sélectionner au moins une image");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={SELECT_MEDIAS_STYLE.container}>
        <View style={SELECT_MEDIAS_STYLE.top}>
          <View style={NEW_ROOM_STYLE.header}>
            <Text style={NEW_ROOM_STYLE.title}>Images</Text>
          </View>
          <Text style={{ fontSize: 10, color: "#000", textAlign: "center" }}>
            *Vous pouvez sélectionner jusqu'à 10 images
          </Text>
          <ScrollView horizontal>
            <ImageRoomPicker
              code="0"
              uri={medias[0].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="1"
              uri={medias[1].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="2"
              uri={medias[2].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="3"
              uri={medias[3].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="4"
              uri={medias[4].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="5"
              uri={medias[5].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="6"
              uri={medias[6].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="7"
              uri={medias[7].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="8"
              uri={medias[8].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
            <ImageRoomPicker
              code="9"
              uri={medias[9].image?.uri}
              // managedPick
              // onClick={() => setShowModal(true)}
              onImagePick={onImagePicked}
              width={DEFAULT_MEDIA_WIDTH}
              height={PRODUCT_MEDIA_HEIGHT}
            />
          </ScrollView>
        </View>
        <View>
          <CustomButton
            label="Sélectionner les images"
            textColor={APP_COLORS.PRIMARY_COLOR.color}
            bgColor="transparent"
            onClick={() => setShowModal(true)}
          />
          <CustomButton
            label={customButtonTtile}
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            textColor={APP_COLORS.WHITE_COLOR.color}
            onClick={onValidImages}
          />
          {withCloseButton && (
            <CustomButton
            label="Annuler"
            bgColor={APP_COLORS.RED_COLOR.color}
            textColor={APP_COLORS.WHITE_COLOR.color}
            onClick={onBack}
          />
          )}
        </View>
      </View>
      {/*       
      <Modal
        visible={showModal}
        transparent={false}
        onRequestClose={onClose}
        animationType="slide"
      >
        <ImagesPicker
          onClose={onClose}
          onValidate={onValidateImagesSelection}
          maxSelection={9}
        />
      </Modal> */}
    </View>
  );
}
