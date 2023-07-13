import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      <div>
        {!loading && !error && (
          <div className="m-auto max-w-[650px] border rounded-lg p-12">
            <div className="flex justify-end">
              <Link
                className="px-8 sm:px-12 py-2 rounded-md max-w-full bg-slate-100 hover:bg-slate-200"
                to="/"
              >
                Back
              </Link>
            </div>

            <div>
              <h1 className="mb-2 text-2xl font-semibold">
                {data.project.name}
              </h1>
              <p className="text-sm">{data.project.description}</p>
              <h5 className="text-lg font-semibold mt-5">Project Status</h5>
              <p>{data.project.status}</p>
              <ClientInfo client={data.project.client} />
            </div>
            <div className="flex justify-end">
              <DeleteProjectButton projectId={data.project.id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Project;
