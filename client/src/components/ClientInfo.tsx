import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { Props } from './ClientRow';

const ClientInfo = ({ client }: Props) => {
  return (
    <>
      <h1 className="text-base font-semibold mt-8 mb-4">Client Information</h1>
      <ul className="border rounded-lg p-5">
        <li className="mb-2">
          <FaIdBadge style={{ display: 'inline', marginRight: '10px' }} />{' '}
          {client.name}
        </li>
        <li className="mb-2">
          <FaEnvelope style={{ display: 'inline', marginRight: '10px' }} />{' '}
          {client.email}
        </li>
        <li>
          <FaPhone style={{ display: 'inline', marginRight: '10px' }} />{' '}
          {client.phone}
        </li>
      </ul>
      <div></div>
    </>
  );
};

export default ClientInfo;
