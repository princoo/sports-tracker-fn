import CenterModal from "./CenterModal";
import Modal from './Modal';

const ConfirmDeleteModal = (props: {
  isOpen: boolean;
  action: string;
  asset: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const { isOpen, action, asset, onClose, onConfirm } = props;
  return (
    <CenterModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">
          {`Confirm ${action}`}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {`Are you sure you want to ${action} this ${asset}? This action
                    cannot be undone.`}
        </p>
        <div className="mt-4 flex justify-end space-x-2 ">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline-danger font-medium hover:bg-gray-600 py-2.5 px-3 text-gray-800 dark:text-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-danger py-2.5 px-3 text-black rounded-lg bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </CenterModal>
  );
};

export default ConfirmDeleteModal;
