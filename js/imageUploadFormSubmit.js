import { showSuccessMessage,showErrorMessage } from './messages.js';
// import { sendData } from './api.js';
import { transferData } from './api.js';
import { closeImgUploadOverlay } from './imageUploadForm.js';

// const imgUploadForm = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');


// const submitEvent = async (evt) => {
//   evt.preventDefault();
//   // alert ('должен быть submit');
//   try {
//     // await transferData('send', new FormData(uploadForm));
//     const response = await transferData('send', new FormData(uploadForm));
//     // showSuccessMessage();
//     // closeImgUploadOverlay();
//     console.log(response);
//     // if (response.ok) {
//     //   closeImgUploadOverlay();
//     //   showSuccessMessage();
//     // }
//   } catch {
//     showErrorMessage();
//   } finally {
//     // imageUploadFormSubmit.js строка 150, sliderElement.noUiSlider.destroy();
//     closeImgUploadOverlay();
//     showSuccessMessage();
//     // unblockSubmitButton();
//   }
// };

const submitEvent = async (evt) => {
// const submitEvent = async (evt) => {
  // alert('должен быть submit');
  evt.preventDefault();
  // return;
  try {
    // const response = await transferData('send', new FormData(uploadForm));
    await transferData('send', new FormData(uploadForm));
    // console.log(response);
  } catch {
    showErrorMessage();
  } finally {
    closeImgUploadOverlay();
    showSuccessMessage();
  }
};


// const submitEvent = async (evt) => {
//   evt.preventDefault();
//   // alert ('должен быть submit');
//   try {
//     await transferData('send', new FormData(uploadForm));
//   } catch {
//     showErrorMessage();
//   } finally {
//     closeImgUploadOverlay();
//     showSuccessMessage();
//   }
// };


const addSubmitEventListener = () => {
  // uploadForm.addEventListener('submit', submitEventListener, { once: true });
  // alert('должен быть submit');
  // return;
  uploadForm.addEventListener('submit', submitEvent);
};

const removeSubmitEventListener = () => {
  // return;
  uploadForm.removeEventListener('submit', submitEvent);
};

export { addSubmitEventListener, removeSubmitEventListener };
