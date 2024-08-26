import {
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import style from "../styles/myStyle";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../constants";

const Home = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={style.image}
    >
      <SafeAreaView style={style.container}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLORS.gray2,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerShown: true,
            headerBlurEffect: true,
            headerTitle: "",
            headerRight: () => (
              <Button title="Login" onPress={() => console.log("Log in")} />
            ),
          }}
        />
        <Text style={style.paragraph}>Calendar App</Text>
        <TouchableOpacity
          onPress={() => router.push("/calendar")}
          accessibilityLabel="Enter the Calendar"
        >
          <Text style={style.paragraph}>ENTER</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
