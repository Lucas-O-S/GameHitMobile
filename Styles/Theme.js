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
    ,
    // Modal / CustomAlert styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalBox: {
        width: '100%',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    modalMessage: {
        color: Colors.textSecondary,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginLeft: 8,
    },
    modalCancel: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    modalConfirm: {
        backgroundColor: Colors.danger,
    },
    modalButtonText: {
        color: Colors.text,
        fontWeight: 'bold',
    }
    ,
    // Common UI pieces
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    cardText: {
        color: Colors.text,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonDanger: {
        backgroundColor: Colors.danger,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        marginVertical: 6,
        marginHorizontal: 0,
        borderRadius: 8,
        overflow: 'hidden',
    },
    listItemContent: {
        flex: 1,
        padding: 14,
    },
    listItemButtons: {
        flexDirection: 'row',
    },
    listItemButton: {
        padding: 12,
    },
    listItemButtonText: {
        color: Colors.text,
        fontWeight: 'bold',
    }
});