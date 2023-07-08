import logo from './../assets/graphqllogo.png';

const Header = () => {
  return (
    <nav className="bg-slate-300">
      <a href="/">
        <div className="flex items-center gap-4 h-16 mx-4 py-2">
          <img className="h-full" src={logo} alt="Logo" />
          <div className="text-lg font-bold">Projekt Management</div>
        </div>
      </a>
    </nav>
  );
};

export default Header;
