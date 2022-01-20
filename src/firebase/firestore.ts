import {
  setDoc,
  getFirestore,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { modifyTasks } from "../redux/features/taskSlice";
import { Task } from "../types";
import uuid from "react-native-uuid";

const firestore = getFirestore();

export const addTask = async (
  title: string,
  deadline: string,
  status: "Open" | "Working" | "Completed",
  userId: string
) => {
  const id = uuid.v4();
  await setDoc(doc(firestore, `tasks/${id}`), {
    id,
    title,
    deadline,
    status,
    userId,
  });
};

export const deleteTask = async (taskId: string) => {
  await deleteDoc(doc(firestore, `tasks/${taskId}`));
};

export const updateTask = async (
  taskId: string,
  title: string,
  deadline: string,
  status: "Open" | "Working" | "Completed"
) => {
  await updateDoc(doc(firestore, `tasks/${taskId}`), {
    title,
    deadline,
    status,
  });
};

export const getTasks = (
  currentUserId: string,
  dispatch: (param: any) => void
) => {
  const q = query(collection(firestore, "tasks"));
  const unsubscribe = onSnapshot(q, (taskSnapshot) => {
    const tasks: Task[] = [];
    taskSnapshot.forEach((doc) => {
      const task = doc.data() as Task;
      if (currentUserId === task.userId) tasks.push(task);
    });
    dispatch(modifyTasks(tasks));
  });
  return unsubscribe;
};
