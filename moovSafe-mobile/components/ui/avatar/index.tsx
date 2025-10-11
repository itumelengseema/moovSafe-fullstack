import React from "react";
import {
  View,
  Image,
  Text,
  ViewProps,
  ImageProps,
  TextProps,
} from "react-native";

// Simple Avatar component using native React Native components
interface AvatarProps extends ViewProps {
  size?: "sm" | "md" | "lg" | "xl";
}

interface AvatarImageProps extends ImageProps {}

interface AvatarFallbackTextProps extends TextProps {}

interface AvatarBadgeProps extends ViewProps {}

const Avatar: React.FC<AvatarProps> = ({ size = "md", style, ...props }) => {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  const avatarSize = sizeMap[size];

  return (
    <View
      style={[
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: "#F9FAFB",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      {...props}
    />
  );
};

const AvatarImage: React.FC<AvatarImageProps> = ({ style, ...props }) => {
  return (
    <Image
      style={[
        {
          width: "100%",
          height: "100%",
          borderRadius: 999,
        },
        style,
      ]}
      {...props}
    />
  );
};

const AvatarFallbackText: React.FC<AvatarFallbackTextProps> = ({
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          color: "#111827",
          fontWeight: "500",
        },
        style,
      ]}
      {...props}
    />
  );
};

const AvatarBadge: React.FC<AvatarBadgeProps> = ({ style, ...props }) => {
  return (
    <View
      style={[
        {
          position: "absolute",
          top: -4,
          right: -4,
          width: 16,
          height: 16,
          backgroundColor: "#DC2626",
          borderRadius: 8,
          borderWidth: 2,
          borderColor: "white",
        },
        style,
      ]}
      {...props}
    />
  );
};

Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallbackText.displayName = "AvatarFallbackText";
AvatarBadge.displayName = "AvatarBadge";

export { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge };
