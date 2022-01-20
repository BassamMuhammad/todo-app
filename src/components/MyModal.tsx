import { Modal, StyleSheet, View } from "react-native";
import { MyButton } from "./MyButton";
import { Entypo } from "@expo/vector-icons";

type MyModalType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MyModal: React.FC<MyModalType> = ({
  children,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <MyButton
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Entypo name="cross" size={24} color="#f5b403" />
          </MyButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalView: {
    backgroundColor: "#444",
    borderColor: "#f5b403",
    borderWidth: 2,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
  },
  closeBtn: {
    position: "absolute",
    top: "1%",
    left: "1%",
    elevation: 10,
  },
});
