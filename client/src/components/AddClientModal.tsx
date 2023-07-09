import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { FaUserIcon } from 'react-icons/fa';
import Modal from '@mui/material/Modal';

interface FormData {
  name: string;
  email: string;
  phone?: string;
}

const AddClientModal = () => {
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev): FormData => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="relative">
      <button
        className="bg-black text-white p-2 border rounded-md hover:bg-gray-700"
        onClick={handleOpen}
      >
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 min-w-[80%] md:min-w-[70%] lg:min-w-[40%]">
          <h1 className="text-xl font-bold"> Add Client</h1>
          <div className="my-2 py-8 w-full border-t-2 border-b-2 border-gray-200 ">
            <form className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="border-2 rounded-md w-full px-2"
                  onChange={handleInput}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  className="border-2 rounded-md w-full px-2"
                  onChange={handleInput}
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone">Phone</label>
                <input
                  className="border-2 rounded-md w-full px-2"
                  onChange={handleInput}
                  type="text"
                  id="phone"
                  name="phone"
                  autoComplete="off"
                />
              </div>
            </form>
          </div>
          <div>
            <button
              className="bg-black text-white p-2 border rounded-md hover:bg-gray-700"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="bg-blue-700 text-white p-2 border rounded-md hover:bg-blue-500"
              onClick={handleClose}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddClientModal;
