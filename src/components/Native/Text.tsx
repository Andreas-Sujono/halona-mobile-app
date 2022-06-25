import { Text as UIText, TextProps } from '@ui-kitten/components';
import React, { memo } from 'react';
import { useAppSelector } from 'Store';
import { selectColors, selectFontSizeScale } from 'Store/Selector/auth/theme';
import { ColorType } from 'utils/colors';

function Text({
  children,
  color = 'textPrimary',
  fontSize = 16,
  maxFontSize,
  minFontSize,
  ...props
}: {
  children?: React.ReactElement | React.ReactElement[] | string;
  color?: ColorType;
  fontSize?: number;
  maxFontSize?: number;
  minFontSize?: number;
} & TextProps) {
  const colors = useAppSelector(selectColors);
  const fontSizeScale = useAppSelector(selectFontSizeScale);
  const selectedColor = colors[color];
  const injectedStyle = props.style && props.style instanceof Array ? props.style : [props.style];

  let finalFontSize = fontSizeScale * fontSize;
  if (maxFontSize) {
    finalFontSize = Math.min(finalFontSize, maxFontSize);
  }
  if (minFontSize) {
    finalFontSize = Math.max(finalFontSize, minFontSize);
  }

  return (
    <UIText
      {...props}
      style={[
        injectedStyle,
        {
          color: selectedColor,
          fontSize: finalFontSize,
        },
      ]}
    >
      {children}
    </UIText>
  );
}

export default memo(Text);
