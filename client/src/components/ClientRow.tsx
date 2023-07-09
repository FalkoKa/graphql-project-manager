import { Client } from './Clients';
import { FaTrash } from 'react-icons/fa';

type Props = {
  client: Client;
};

const ClientRow = ({ client }: Props) => {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
