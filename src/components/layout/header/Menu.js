import MenuItem from './MenuItem';

const menu = [
  { to: '/', title: 'Home' },
  { to: '/create-transaction', title: 'Create Transaction' }
];

function Menu() {
  return (
    <div className="navbar-collapse justify-content-end">
      <ul className="navbar-nav">
        {menu.map(item => (
          <MenuItem key={item.title} to={item.to}>
            {item.title}
          </MenuItem>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
