import { StyleSheet } from "react-native";
import { MyButton } from "./MyButton";

type CircleType = {
  bgColor: string;
};

export const Circle: React.FC<CircleType> = ({
  children,
  bgColor = "black",
}) => {
  return (
    <MyButton
      onPress={() => {}}
      style={[styles.circle, { backgroundColor: bgColor }]}
    >
      {children}
    </MyButton>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
