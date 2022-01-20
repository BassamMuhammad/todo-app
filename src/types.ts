export type Task = {
  id: string;
  title: string;
  deadline: string;
  status: "Open" | "Working" | "Completed";
  userId: string;
};
