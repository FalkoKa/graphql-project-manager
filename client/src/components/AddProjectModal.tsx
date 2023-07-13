import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { FaList } from 'react-icons/fa';
import Modal from '@mui/material/Modal';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { Cache } from './ClientRow';
import { Client } from './Clients';

interface FormData {
  name?: string;
  description?: string;
  clientId?: string;
  status?: 'new' | 'progress' | 'completed';
}

const AddProjectModal = () => {
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [formInput, setFormInput] = useState<FormData>({
    name: '',
    description: '',
    clientId: '',
    status: 'new',
  });

  const { name, description, clientId, status } = formInput;
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache: Cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
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
    if (formInput.name === '' || formInput.description === '') {
      return alert('Please fill in all fields');
    }

    addProject({ variables: { name, description, clientId, status } });
    setOpen(false);
    setFormInput({
      name: '',
      description: '',
      status: 'new',
      clientId: '',
    });
  };

  if (loading) return null;
  if (error) return 'Something went wrong...';

  return (
    <>
      {!loading && !error && (
        <div className="relative my-4">
          <button
            className="bg-blue-700 text-white p-2 border rounded-md hover:bg-blue-800 flex items-center gap-2"
            onClick={handleOpen}
          >
            <FaList />
            <span>Add Project</span>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 min-w-[80%] md:min-w-[70%] lg:min-w-[40%]">
              <h1 className="text-xl font-bold">New Project</h1>
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
                    <label htmlFor="description">Description</label>
                    <textarea
                      value={description}
                      onChange={handleInput}
                      className="border-2 rounded-md w-full px-2"
                      name="description"
                      id="description"
                      cols={30}
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="status">Status</label>
                    <select
                      className="border-2 rounded-md p-2 text-sm"
                      name="status"
                      id="status"
                      value={status}
                      onChange={handleInput}
                    >
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="clientId">Client</label>
                    <select
                      className="border-2 rounded-md p-2 text-sm"
                      name="clientId"
                      id="clientId"
                      value={clientId}
                      onChange={handleInput}
                    >
                      <option value="">Select Client</option>
                      {data.clients.map((client: Client) => {
                        return (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        );
                      })}
                    </select>
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
      )}
    </>
  );
};

export default AddProjectModal;
