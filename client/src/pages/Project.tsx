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
          <div>
            <Link
              className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              to="/"
            >
              Back
            </Link>
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
            <h5>Project Status</h5>
            <p>{data.project.status}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Project;
