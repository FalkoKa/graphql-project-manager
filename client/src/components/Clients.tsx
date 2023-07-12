import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from '../queries/clientQueries';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="text-sm md:text-base w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 min-w-[200px]">Phone</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client: Client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Clients;
