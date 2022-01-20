import { StyleSheet, Text, View } from "react-native";
import { MyButton } from "../MyButton";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { deleteTask } from "../../firebase/firestore";
import { MyModal } from "../MyModal";
import { AddTask } from "./AddTask";
import { useState } from "react";
type TaskType = {
  title: string;
  deadline: string;
  status: "Open" | "Working" | "Completed";
  id: string;
};
export const Task: React.FC<TaskType> = ({ id, title, deadline, status }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderLeftColor:
              status == "Working"
                ? "yellow"
                : status == "Open"
                ? "red"
                : "green",
          },
        ]}
      >
        <View>
          <Text>{title}</Text>
          <Text>{deadline}</Text>
        </View>
        <View>
          <MyButton onPress={() => deleteTask(id)}>
            <Entypo name="cross" size={24} color="red" />
          </MyButton>
          <MyButton onPress={() => setModalVisible(true)}>
            <FontAwesome name="edit" size={24} color="white" />
          </MyButton>
        </View>
      </View>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <AddTask
          setVisible={() => setModalVisible(false)}
          initTitle={title}
          initDeadline={deadline}
          initStatus={status}
          taskId={id}
        />
      </MyModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(150,150,150)",
    padding: "5%",
    borderRadius: 5,
    borderLeftWidth: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
