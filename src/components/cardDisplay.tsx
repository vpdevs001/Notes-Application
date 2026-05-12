import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CardDisplayProps {
  title: string;
  description: string;
  theme: any;
}

const CardDisplay = ({ title, description, theme }: CardDisplayProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardColor,
          borderColor: theme.borderColor,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.mutedTextColor }]}>
        {description}
      </Text>
    </View>
  );
};

export default CardDisplay;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
});
