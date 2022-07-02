import { Button } from '@ui-kitten/components';
import { View } from 'components/Native';
import Text from 'components/Native/Text';
import React, { memo, useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';

const defaultOptions: ImageLibraryOptions = {
  includeBase64: true,
  //   cameraType: 'back',
  mediaType: 'photo',
  selectionLimit: 1,
};

const { width, height } = Dimensions.get('screen');

function ImagePicker({
  text,
  text2,
  uploadedText,
  options = {},
  style,
}: {
  text: string;
  text2?: string;
  uploadedText?: string;
  options?: ImageLibraryOptions | Record<string, any>;
  style?: any;
}) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [launchPreview, setLaunchPreview] = useState<boolean>(false);

  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  const onClickPreview = () => {
    if (!asset) {
      return;
    }
    setLaunchPreview(true);
  };

  const onDeleteAsset = () => {
    setAsset(null);
  };

  const onLaunchCamera = () => {
    launchCamera(finalOptions, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode && response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
      } else {
        setAsset(response?.assets?.[0] || null);
      }
    });
  };

  const onLaunchImageLibrary = async () => {
    launchImageLibrary(finalOptions, (response: ImagePickerResponse) => {
      if (response?.didCancel) {
        console.log('User cancelled image picker');
      } else if (response?.errorCode && response?.errorMessage) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
      } else {
        setAsset(response?.assets?.[0] || null);
      }
    });
  };

  return (
    <View style={[styles.Container, style]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              flex: 1,
              padding: 12,
              marginRight: 8,
            },
          ]}
          onPress={onLaunchImageLibrary}
        >
          <Text style={[styles.buttonText]}>{text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              flex: 1,
              padding: 12,
            },
          ]}
          onPress={onLaunchImageLibrary}
        >
          <Text style={[styles.buttonText]}>{text2}</Text>
        </TouchableOpacity>
      </View>

      {asset ? (
        <>
          <TouchableOpacity onPress={onClickPreview}>
            <Text style={styles.link}>Preview image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteAsset}>
            <Text style={styles.link}>Delete image</Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
      {launchPreview ? (
        <Modal
          onDismiss={() => setLaunchPreview(false)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'pink',
          }}
        >
          <Image source={{ uri: asset?.uri || '../../assets/no-data.png' }} style={styles.images} />
          <Button style={{ borderRadius: 0 }} onPress={() => setLaunchPreview(false)}>
            Close
          </Button>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#f5f5f5',
    color: 'black',
  },
  buttonText: {
    backgroundColor: '#f5f5f5',
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  images: {
    width: width,
    height: height - 140,
  },
  link: {
    color: 'grey',
    fontSize: 14,
  },
});

export default memo(ImagePicker);
