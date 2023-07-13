import { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

interface FormData {
  name?: string;
  description?: string;
  clientId?: string;
  status?: string;
}

const EditProjectForm = ({ project }: any) => {
  const [formInput, setFormInput] = useState<FormData>({
    name: project.name,
    description: project.description,
    status: '',
  });

  const { name, description, status } = formInput;

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev): FormData => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert('Please fill in all fields');
    }

    updateProject({ variables: { id: project.id, name, description, status } });
  };

  return (
    <>
      <div className="mt-4">
        <h5 className="text-xl font-semibold mt-7 mb-2">
          Update Project Details
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              className="border-2 rounded-md w-full p-2"
              onChange={handleInput}
              type="text"
              id="name"
              name="name"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
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
          <button
            className="bg-blue-700 text-white py-2 px-6 mt-3 border rounded-md hover:bg-blue-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
