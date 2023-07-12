import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Modal from '@mui/material/Modal';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Cache } from './ClientRow';

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

  const { name, phone, email } = formInput;
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache: Cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev): FormData => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log(formInput);
    if (
      formInput.name === '' ||
      formInput.email === '' ||
      formInput.phone === ''
    ) {
      return alert('Please fill in all fields');
    }

    addClient({ variables: { name, phone, email } });
    setOpen(false);
    setFormInput({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="relative my-4">
      <button
        className="bg-black text-white p-2 border rounded-md hover:bg-gray-700 flex items-center gap-2"
        onClick={handleOpen}
      >
        <FaUser />
        <span>Add Client</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 min-w-[80%] md:min-w-[70%] lg:min-w-[40%]">
          <h1 className="text-xl font-bold"> Add Client</h1>
          <div className="py-6 w-full border-t-2 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
              <button
                type="submit"
                className="bg-blue-700 text-white p-2 border rounded-md hover:bg-blue-500 mt-6"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddClientModal;
