import './list.css';

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="grid-list">{children}</div>;
};

export default List;
