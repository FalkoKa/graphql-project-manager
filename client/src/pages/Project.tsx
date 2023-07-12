import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      <div>
        {!loading && !error && (
          <div className="m-auto max-w-[650px] border rounded-lg py-16 px-12 flex justify-between items-center">
            <div>
              <h1 className="my-2 text-2xl font-semibold">
                {data.project.name}
              </h1>
              <p className="text-sm">{data.project.description}</p>
              <h5 className="text-lg font-semibold mt-5">Project Status</h5>
              <p>{data.project.status}</p>
            </div>
            <Link
              className="px-8 sm:px-12 py-2 rounded-md max-w-full bg-slate-100 hover:bg-slate-200"
              to="/"
            >
              Back
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Project;
