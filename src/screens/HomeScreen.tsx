import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { AddTask } from "../components/HomeScreen/AddTask";
import { Task } from "../components/HomeScreen/Task";
import { MyButton } from "../components/MyButton";
import { getTasks } from "../firebase/firestore";
import { selectTasks } from "../redux/features/taskSlice";
import { selectUser } from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const HomeScreen = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const tasks = useAppSelector(selectTasks);
  const userId = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = getTasks(userId!, dispatch);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.heading}>Task Tracker</Text>
          <MyButton
            onPress={() => setShowAddTask(!showAddTask)}
            style={styles.btn}
          >
            <Text style={styles.white}>
              {showAddTask ? "Hide" : "Add"} Task
            </Text>
          </MyButton>
        </View>
        <View style={styles.addTask}>
          {showAddTask && <AddTask setVisible={setShowAddTask} />}
        </View>
        <View>
          {tasks.map((task, index) => (
            <View style={styles.tasks} key={index}>
              <Task
                id={task.id}
                status={task.status}
                title={task.title}
                deadline={task.deadline}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
  btn: {
    padding: "3%",
    borderRadius: 10,
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
  addTask: {
    marginBottom: "10%",
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  white: {
    color: "white",
  },
  tasks: {
    marginBottom: "5%",
  },
});
