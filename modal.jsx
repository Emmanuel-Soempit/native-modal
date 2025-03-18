import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  TextInput,
  Button,
  Keyboard,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const UploadModal = ({ visible, onClose }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = new Animated.Value(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        Animated.timing(translateY, {
          toValue: -event.endCoordinates.height,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <TextInput
              placeholder="Enter details..."
              style={styles.input}
              autoFocus
            />
          </View>

          <Animated.View
            style={[styles.toolbar, { transform: [{ translateY }] }]}
          >
            <Button title="Upload" onPress={onClose} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  toolbar: {
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

export default UploadModal;
