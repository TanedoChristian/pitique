const Header = ({ children, className }) => (
  <header className={`w-full h-[8vh] bg-cyan-500  text-white ${className}`}>
    {children}
  </header>
);

export default Header;
