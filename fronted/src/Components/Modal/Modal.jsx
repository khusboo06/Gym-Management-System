import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ handleClose, content, header }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-start z-50">
      {/* Modal box */}
      <div className="bg-white rounded-lg p-5 mt-15 sm:mt-32 w-11/12 sm:w-1/2 max-w-md sm:max-w-lg
                      max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-xl sm:text-4xl font-semibold">{header}</div>
          <div onClick={handleClose} className="cursor-pointer">
            <CloseIcon sx={{ fontSize: "26px" }} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 sm:mt-6">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Modal;
