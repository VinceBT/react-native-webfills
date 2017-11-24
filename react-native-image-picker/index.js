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

function uint8ToString(buf) {
  let i,
    length,
    out = '';
  for (i = 0, length = buf.length; i < length; i += 1)
    out += String.fromCharCode(buf[i]);

  return out;
}

const ImagePicker = {
  showImagePicker(options, callback) {
    const actualCallback = typeof options === 'function' ? options : callback;
    const actualOptions = typeof options === 'function' ? {} : options;
    console.log({ ...DEFAULT_OPTIONS, ...options });
    // navigator.mediaDevices.getUserMedia()
    const fileElem = document.createElement('input');
    fileElem.type = 'file';
    fileElem.accept = 'image/*';
    fileElem.style = 'display:none';
    fileElem.onchange = function () {
      const file = this.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const base64StringWithPrefix = reader.result;
        const base64String = base64StringWithPrefix.slice(base64StringWithPrefix.indexOf(',') + 1);
        actualCallback({ data: base64String });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };
    fileElem.click();
  },
};

export default ImagePicker;
