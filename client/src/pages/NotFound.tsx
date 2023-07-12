import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-16">
      <FaExclamationTriangle size={60} color="red" />
      <h1 className="text-3xl font-bold">404</h1>
      <p>Sorry, this page does not exist</p>
      <Link
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        to={'/'}
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
