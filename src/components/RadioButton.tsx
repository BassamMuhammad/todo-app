import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  GestureResponderEvent,
} from "react-native";
import { MyButton } from "./MyButton";

type RadioButtonType = {
  style?: StyleProp<ViewStyle>;
  selected: boolean;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
};
export const RadioButton: React.FC<RadioButtonType> = ({
  style = {},
  selected,
  onPress,
  text,
}) => {
  return (
    <MyButton onPress={onPress} style={{ flexDirection: "row" }}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#f5b403",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          },
          style,
        ]}
      >
        {selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "#f5b403",
            }}
          />
        ) : null}
      </View>
      <Text style={{ color: "white" }}>{text}</Text>
    </MyButton>
  );
};
