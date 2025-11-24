import { StyleSheet } from "react-native";

export const Colors = {
    background: "#121214",
    surface: "#202024",
    primary: "#8257E5",
    secondary: "#04D361",
    danger: "#E83F5B",
    text: "#E1E1E6",
    textSecondary: "#A8A8B3",
    border: "#29292E"
    };

    export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.text,
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        color: Colors.textSecondary,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: Colors.surface,
        color: Colors.text,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 6
    }
});