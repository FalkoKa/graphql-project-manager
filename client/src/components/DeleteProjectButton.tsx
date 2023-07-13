import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';

const DeleteProjectButton = ({ projectId }: any) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <button
      onClick={deleteProject}
      className="flex gap-2 items-center text-white rounded-md bg-red-800 hover:bg-red-600 p-2 px-6 mt-6"
    >
      <FaTrash color="white" /> Delete Project
    </button>
  );
};

export default DeleteProjectButton;
