import { Client } from './Clients';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export type Props = {
  client: Client;
};

export interface Cache {
  [index: string]: any;
}

const ClientRow = ({ client }: Props) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <tr className="border-b hover:bg-slate-100">
      <td className="px-6 py-2">{client.name}</td>
      <td className="px-6 py-2">{client.email}</td>
      <td className="px-6 py-2">{client.phone}</td>
      <td className="px-6 py-2">
        <button
          className="rounded-md bg-red-800 hover:bg-red-600 p-3"
          onClick={() => deleteClient({ variables: { id: client.id } })}
        >
          <FaTrash color="white" />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
