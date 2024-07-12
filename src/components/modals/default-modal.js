import React from "react";
import { Modal } from "react-native";

export default function DefaultModal({
  show,
  onClose,
  content,
  transparent = false,
  animation = "slide",
  backgroundColor = "#000",
}) {
  return (
    <Modal
      animationType={animation}
      transparent={transparent}
      visible={show}
      onRequestClose={onClose}
      statusBarTranslucent={true}
      style={{ backgroundColor }}
    >
      {content}
    </Modal>
  );
}
