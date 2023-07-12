import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import Clients from '../components/Clients';

const Home = () => {
  return (
    <div>
      <AddClientModal />
      <Projects />
      <hr className="my-4" />

      <Clients />
    </div>
  );
};

export default Home;
