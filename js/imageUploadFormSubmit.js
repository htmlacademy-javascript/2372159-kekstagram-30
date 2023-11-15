import { showSuccessMessage,showErrorMessage } from './messages.js';
import { sendData } from './api.js';
import { closeImgUploadOverlay } from './imageUploadForm.js';

// const imgUploadForm = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');


const submitEvent = async (evt) => {
  evt.preventDefault();
  try {
    const response = await sendData(new FormData(uploadForm));
    if (response.ok) {
      closeImgUploadOverlay();
      showSuccessMessage();
    }
  } catch {
    showErrorMessage();
  } finally {
    // unblockSubmitButton();
  }
};


const addSubmitEventListener = () => {
  // uploadForm.addEventListener('submit', submitEventListener, { once: true });
  uploadForm.addEventListener('submit', submitEvent);
};

const removeSubmitEventListener = () => {
  uploadForm.remove('submit', submitEvent);
};

export { addSubmitEventListener, removeSubmitEventListener };
