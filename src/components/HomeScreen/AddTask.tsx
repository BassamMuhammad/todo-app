import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, PointPropType } from "react-native";
import { MyButton } from "../../components/MyButton";
import { addTask, updateTask } from "../../firebase/firestore";
import { selectUser } from "../../redux/features/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { RadioButton } from "../RadioButton";

type AddTaskType = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initTitle?: string;
  initDeadline?: string;
  initStatus?: "Open" | "Completed" | "Working";
  taskId?: string;
};
export const AddTask: React.FC<AddTaskType> = ({
  setVisible,
  initTitle = "",
  initStatus = "Open",
  initDeadline = "",
  taskId,
}) => {
  const [title, setTitle] = useState(initTitle);
  const [deadline, setDeadline] = useState(initDeadline);
  const [radioButtons, setRadioButtons] = useState<boolean[]>([
    initStatus === "Open",
    initStatus === "Working",
    initStatus === "Completed",
  ]);
  const userId = useAppSelector(selectUser);

  const handleRadioButtonPress = (index: number) => {
    let tempRadioButtons = [...radioButtons];
    for (let i = 0; i < tempRadioButtons.length; i++)
      tempRadioButtons[i] = false;
    tempRadioButtons[index] = true;
    setRadioButtons(tempRadioButtons);
  };

  const handleSaveTask = () => {
    if (title.trim().length === 0 || deadline.trim().length === 0) return;
    const status = radioButtons[0]
      ? "Open"
      : radioButtons[1]
      ? "Working"
      : "Completed";
    setVisible(false);
    if (taskId) updateTask(taskId, title, deadline, status);
    else addTask(title, deadline, status, userId!);
  };
  return (
    <View>
      <TextInput
        placeholder="Title"
        placeholderTextColor={"rgb(200,200,200)"}
        style={styles.textInput}
        value={title}
        onChange={(event) => setTitle(event.nativeEvent.text)}
      />
      <TextInput
        placeholder="Deadline"
        placeholderTextColor={"rgb(200,200,200)"}
        style={styles.textInput}
        value={deadline}
        onChange={(event) => setDeadline(event.nativeEvent.text)}
      />
      <View style={styles.row}>
        {["Open", "Working", "Completed"].map((val, index) => (
          <View key={index} style={styles.radioBtn}>
            <RadioButton
              selected={radioButtons[index]}
              onPress={() => handleRadioButtonPress(index)}
              text={val}
            />
          </View>
        ))}
      </View>
      <MyButton onPress={handleSaveTask} style={styles.btn}>
        <Text style={styles.text}>Save</Text>
      </MyButton>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: "3%",
    borderRadius: 20,
    backgroundColor: "#f5b403",
  },
  textInput: {
    borderRadius: 50,
    width: "100%",
    borderWidth: 3,
    marginBottom: "5%",
    borderColor: "#f5b403",
    padding: "5%",
    color: "rgb(200,200,200)",
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: "5%",
  },
  radioBtn: {
    marginRight: "3%",
  },
});
