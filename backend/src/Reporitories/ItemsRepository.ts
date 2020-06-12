import knex from '../database/connection';

class ItemsRepository {
  async GetAll() {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        name: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      }
    });

    return serializedItems;
  }
}

export default ItemsRepository;