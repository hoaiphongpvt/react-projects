import { useLoaderData, useNavigation } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData()

  return <ul className='divide-y devide-stone-200'>
    {menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id}/>)}
  </ul>;
}

export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu;
