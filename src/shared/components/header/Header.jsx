import "./Header.css";

const Header = ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header-logo">
        <img src="/netflix-logo.png" alt="Netflix" />
      </div>
    </header>
  );
};

export { Header };
