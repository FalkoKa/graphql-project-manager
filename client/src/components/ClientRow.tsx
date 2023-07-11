import { Client } from './Clients';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

type Props = {
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
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button onClick={() => deleteClient({ variables: { id: client.id } })}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
