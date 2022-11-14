import React from "react";
import { TouchableOpacity, Text, Image, ImageSourcePropType } from "react-native";

import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";

type TCircle = {
  imgUrl: ImageSourcePropType,
  handlePress?: () => any,
  left?: number,
  top?: number,
  right?: number
}

export const CircleButton = ({ imgUrl, handlePress, ...props }: TCircle) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

type TRec = {
  minWidth: number,
  fontSize: number,
  handlePress?: () => any
}

export const RectButton = ({ minWidth, fontSize, handlePress, ...props }: TRec) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.small,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: fontSize,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        Place a bid
      </Text>
    </TouchableOpacity>
  );
};
