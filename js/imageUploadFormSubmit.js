import { showSuccessMessage,showErrorMessage } from './messages.js';
import { transferData } from './api.js';
import { closeImgUploadOverlay } from './imageUploadForm.js';

const uploadForm = document.querySelector('.img-upload__form');


const submitEvent = async (evt) => {
  evt.preventDefault();
  try {
    await transferData('send', new FormData(uploadForm));
  } catch {
    showErrorMessage();
  } finally {
    closeImgUploadOverlay(); // !!!
    showSuccessMessage();
  }
};


const addSubmitEventListener = () => {
  uploadForm.addEventListener('submit', submitEvent);
};

const removeSubmitEventListener = () => {
  uploadForm.removeEventListener('submit', submitEvent);
};

export { addSubmitEventListener, removeSubmitEventListener };
