const Header = ({ headerInfo }) => {
  return (
    <div className="flex items-center gap-2">
      {headerInfo.icon}
      <h1 className="text-[24px] font-bold">{headerInfo.title}</h1>
    </div>
  );
};

export default Header;
