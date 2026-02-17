import { useState } from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function IndexRoute() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const colorScheme = useColorScheme();

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: AC.systemBackground,
      paddingTop: 60,
    }}>
      {/* Display */}
      <View style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 20,
        backgroundColor: AC.systemBackground,
      }}>
        <Text style={{
          fontSize: 48,
          fontWeight: "200",
          color: AC.label,
          textAlign: "right",
          fontVariant: ["tabular-nums"],
          selectable: true,
        }}>
          {display}
        </Text>
      </View>

      {/* Buttons */}
      <View style={{
        backgroundColor: AC.systemBackground,
        padding: 10,
      }}>
        {/* Row 1 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <CalculatorButton
            title="C"
            onPress={clear}
            backgroundColor={AC.systemGray3}
            textColor={AC.label}
          />
          <CalculatorButton
            title="CE"
            onPress={clearEntry}
            backgroundColor={AC.systemGray3}
            textColor={AC.label}
          />
          <View style={{ flex: 1 }} />
          <CalculatorButton
            title="÷"
            onPress={() => inputOperation("÷")}
            backgroundColor={AC.systemOrange}
            textColor="white"
          />
        </View>

        {/* Row 2 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <CalculatorButton
            title="7"
            onPress={() => inputNumber("7")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="8"
            onPress={() => inputNumber("8")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="9"
            onPress={() => inputNumber("9")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="×"
            onPress={() => inputOperation("×")}
            backgroundColor={AC.systemOrange}
            textColor="white"
          />
        </View>

        {/* Row 3 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <CalculatorButton
            title="4"
            onPress={() => inputNumber("4")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="5"
            onPress={() => inputNumber("5")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="6"
            onPress={() => inputNumber("6")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="−"
            onPress={() => inputOperation("-")}
            backgroundColor={AC.systemOrange}
            textColor="white"
          />
        </View>

        {/* Row 4 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <CalculatorButton
            title="1"
            onPress={() => inputNumber("1")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="2"
            onPress={() => inputNumber("2")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="3"
            onPress={() => inputNumber("3")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="+"
            onPress={() => inputOperation("+")}
            backgroundColor={AC.systemOrange}
            textColor="white"
          />
        </View>

        {/* Row 5 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <CalculatorButton
            title="0"
            onPress={() => inputNumber("0")}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
            style={{ flex: 2 }}
          />
          <CalculatorButton
            title="."
            onPress={inputDecimal}
            backgroundColor={AC.systemGray5}
            textColor={AC.label}
          />
          <CalculatorButton
            title="="
            onPress={performCalculation}
            backgroundColor={AC.systemOrange}
            textColor="white"
          />
        </View>
      </View>
    </View>
  );
}

interface CalculatorButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  style?: any;
}

function CalculatorButton({ title, onPress, backgroundColor, textColor, style }: CalculatorButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flex: 1,
          height: 70,
          borderRadius: 35,
          backgroundColor: pressed ? AC.systemGray4 : backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          borderCurve: "continuous",
        },
        style,
      ]}
    >
      <Text style={{
        fontSize: 28,
        fontWeight: "400",
        color: textColor,
      }}>
        {title}
      </Text>
    </Pressable>
  );
}
