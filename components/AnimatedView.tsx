import Colors from '@/constants/colors';
import { useEffect, useRef } from 'react';
import { Animated, DimensionValue, ViewProps } from 'react-native';

type props = {
  width: DimensionValue;
  height: DimensionValue;
  marginTop?: DimensionValue;
  marginVertical?: DimensionValue;
};

export default function AnimatedView({ width, height, marginTop, marginVertical }: props) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        { backgroundColor: Colors.lightGray2, borderRadius: 10, opacity },
        { width },
        { height },
        { marginTop },
        { marginVertical },
      ]}
    ></Animated.View>
  );
}
