import React, { memo, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CheckAppUpdateContext } from 'Context/useCheckAppUpdate';
// import { useMyAccountData } from 'hooks/api/auth/useUserData';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'components/Select';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'Store';
import { selectFontSizeScale, selectTheme } from 'Store/Selector/auth/theme';
import {
  setFontSizeScale,
  setTheme,
  setToDarkColors,
  setToLightColors,
} from 'Store/Actions/auth/theme';
import View from 'components/Native/View';
import { Page, Text } from 'components/Native';

const languageData = [
  {
    label: 'English',
    value: 'en',
    index: 0,
  },
  {
    label: 'Bahasa Indonesia',
    value: 'id',
    index: 1,
  },
];
const themeData = [
  {
    label: 'Light',
    value: 'light',
    index: 0,
  },
  {
    label: 'Dark',
    value: 'dark',
    index: 1,
  },
];
const fontSizeData = [
  {
    label: '80%',
    value: 0.8,
    index: 0,
  },
  {
    label: '100%',
    value: 1,
    index: 1,
  },
  {
    label: '120%',
    value: 1.2,
    index: 2,
  },
  {
    label: '140%',
    value: 1.4,
    index: 3,
  },
  {
    label: '160%',
    value: 1.6,
    index: 4,
  },
];

function SettingScreen() {
  // const { data } = useMyAccountData();
  const appUpdateContext = useContext(CheckAppUpdateContext);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);
  const fontSizeScale = useAppSelector(selectFontSizeScale);

  const languageValue = languageData.find((item) => item.value === i18n.language)?.value || 'en';

  const changeTheme = (theme: any) => {
    dispatch(setTheme(theme));
    if (theme === 'light') {
      dispatch(setToLightColors());
    }
    if (theme === 'dark') {
      dispatch(setToDarkColors());
    }
  };

  const changeFontSizeScale = (scale: any) => {
    dispatch(setFontSizeScale(scale));
  };

  return (
    <Page style={styles.Container}>
      <View style={[styles.pageSectionContainer, styles.row]}>
        <Text style={styles.rowLeft}>{t('settings.select_language')}</Text>
        <Select
          style={{
            flexGrow: 1,
          }}
          items={languageData}
          selectedValue={languageValue}
          onChangeValue={(value) => i18n.changeLanguage((value as any).value)}
        />
      </View>
      <View style={[styles.pageSectionContainer, styles.row]}>
        <Text style={styles.rowLeft}>{t('settings.select_theme')}</Text>
        <Select
          style={{
            flexGrow: 1,
          }}
          items={themeData}
          selectedValue={theme}
          onChangeValue={(value) => changeTheme((value as any).value)}
        />
      </View>
      <View style={[styles.pageSectionContainer, styles.row]}>
        <Text style={styles.rowLeft}>{t('settings.select_font_size_scale')}</Text>
        <Select
          style={{
            flexGrow: 1,
          }}
          items={fontSizeData}
          selectedValue={fontSizeScale}
          onChangeValue={(value) => changeFontSizeScale((value as any).value)}
        />
      </View>
      <TouchableOpacity
        onPress={appUpdateContext.onCheckServerVersion}
        style={styles.pageSectionContainer}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon name="upload" size={16} color="#0d43ee" style={styles.icon} />
          <Text style={styles.pageLink}>{t('settings.check_updates')}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.pageSectionContainer}>
        {t('settings.installed_version_code', { version: '0.0.1' })}
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 16,
    // paddingTop: 22,
  },
  pageSectionContainer: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeft: {
    marginRight: 12,
    width: '40%',
  },
  icon: {
    marginRight: 12,
  },
  pageLink: {
    color: '#0d43ee',
  },
});

export default memo(SettingScreen);
