
import * as React from 'react';
import { StatusBar } from "expo-status-bar"
import { useIsFocused } from "@react-navigation/native"

type TFocus = {
  background?: string,
  backgroundColor: string,
  barStyle?: string,
  translucent?: boolean
}

const FocusedStatusBar = (props: TFocus) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar animated={true} {...props}/> : null;

}

export default FocusedStatusBar
