import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import Clients from '../components/Clients';
import AddProjectModal from '../components/AddProjectModal';

const Home = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 my-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr className="my-4" />
      <Clients />
    </div>
  );
};

export default Home;
