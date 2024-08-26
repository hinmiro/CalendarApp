import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  navButton: {
    padding: 5,
    width: "auto",
  },
  navBar: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default styles;
