import { View, StyleSheet } from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Filter,
  FeFlood,
  FeBlend,
  FeGaussianBlur,
} from "react-native-svg";
const Background = () => (
  <View style={StyleSheet.absoluteFill}>
    <Svg width="100%" height="100%" viewBox="0 0 390 844" fill="none">
      <Defs>
        <Filter
          id="filter0_f_5_2204"
          x="-151.55"
          y="-83.296"
          width="708.668"
          height="1087.08"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="105"
            result="effect1_foregroundBlur_5_2204"
          />
        </Filter>
        <LinearGradient
          id="paint0_linear_5_2204"
          x1="194.5"
          y1="774"
          x2="194.5"
          y2="148"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.185" stopColor="#C26CFF" />
          <Stop offset="1" stopColor="#1C55FF" />
        </LinearGradient>
      </Defs>
      <G opacity="0.8" filter="url(#filter0_f_5_2204)">
        <Path
          d="M322.769 148L121.552 271.729C66.485 305.59 72.2391 387.399 131.504 413.218L274.055 475.322C329.817 499.615 339.145 574.788 291.011 611.973L81.2773 774"
          stroke="url(#paint0_linear_5_2204)"
          strokeWidth="50"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  </View>
);

export default Background;
