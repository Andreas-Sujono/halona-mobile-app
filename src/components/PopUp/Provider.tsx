import React, { memo } from 'react';
import PopUp from './PopUp';
import SPSheet from './BottomSheet';

const PopUpProvider = ({ children }: any) => {
  return (
    <>
      {children}
      <PopUp
        ref={(c) => {
          if (c) {
            PopUp.popupInstance = c;
          }
        }}
      />
      <SPSheet
        ref={(c) => {
          if (c) {
            SPSheet.spsheetInstance = c;
          }
        }}
      />
    </>
  );
};

export default memo(PopUpProvider);
