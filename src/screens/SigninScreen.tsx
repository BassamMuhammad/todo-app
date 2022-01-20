import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle } from "../components/Circle";
import { MyButton } from "../components/MyButton";
import { signup } from "../firebase/auth";
import { useAppDispatch } from "../redux/hooks";
import { changeUser } from "../redux/features/userSlice";

export const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const submitForm = async () => {
    try {
      if (password !== confirmPassword) throw Error("Password does not match");
      const userId = await signup(email, password);
      dispatch(changeUser(userId));
    } catch (error) {
      setError((error as { message: string }).message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <KeyboardAvoidingView>
        <StatusBar style="auto" />
        <AntDesign name="arrowleft" size={24} color="white" />
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.heading}>Create an account</Text>
            <Text style={styles.gray}>
              Fill the details &amp; create your account
            </Text>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Username/Email ID"
              keyboardType="email-address"
              placeholderTextColor={"rgb(200,200,200)"}
              style={styles.textInput}
              value={email}
              onChange={(event) => setEmail(event.nativeEvent.text)}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={"rgb(200,200,200)"}
              style={styles.textInput}
              value={password}
              onChange={(event) => setPassword(event.nativeEvent.text)}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              placeholderTextColor={"rgb(200,200,200)"}
              style={styles.textInput}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.nativeEvent.text)}
            />
            <MyButton style={styles.btn} onPress={submitForm}>
              <Text style={styles.btnText}>Continue</Text>
            </MyButton>
            <Text>{error}</Text>
          </View>
          <View>
            <Text style={styles.white}>or signin with</Text>
            <View style={styles.socialIcons}>
              <View style={styles.space}>
                <Circle bgColor="blue">
                  <FontAwesome name="facebook" size={24} color="white" />
                </Circle>
              </View>
              <Circle bgColor="red">
                <AntDesign name="google" size={24} color="white" />
              </Circle>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  innerContainer: {
    paddingHorizontal: "7%",
    marginTop: "10%",
  },
  heading: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    width: "40%",
    marginBottom: "5%",
  },
  white: {
    color: "#fff",
    textAlign: "center",
  },
  gray: {
    color: "rgb(200,200,200)",
  },
  form: {
    marginVertical: "20%",
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
  btn: {
    padding: "5%",
    borderRadius: 50,
    backgroundColor: "#f5b403",
  },
  btnText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "center",
  },
  space: {
    marginRight: "5%",
  },
});
