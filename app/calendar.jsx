import CalendarComponent from "../components/CalendarComponent";
import { BlurView } from "expo-blur";
import { ImageBackground } from "react-native";
import style from "../styles/myStyle";

const CalendarScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={style.image}
    >
      <BlurView intensity={150} style={style.absolute}>
        <CalendarComponent />
      </BlurView>
    </ImageBackground>
  );
};

export default CalendarScreen;
