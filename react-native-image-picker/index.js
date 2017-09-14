// @flow

const DEFAULT_OPTIONS = {
  title: 'Select a Photo',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo…',
  chooseFromLibraryButtonTitle: 'Choose from Library…',
  quality: 1.0,
  allowsEditing: false,
  permissionDenied: {
    title: 'Permission denied',
    text: 'To be able to take pictures with your camera and choose images from your library.',
    reTryTitle: 're-try',
    okTitle: 'I\'m sure',
  },
};

const ImagePicker = {
  showImagePicker(options, callback) {
    const actualCallback = typeof options === 'function' ? options : callback;
    const actualOptions = typeof options === 'function' ? {} : options;
    console.log({...DEFAULT_OPTIONS, ...options});
    // navigator.mediaDevices.getUserMedia() 
  },
};

export default ImagePicker;
