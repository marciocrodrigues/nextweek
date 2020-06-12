import PointModel from '../models/PointModel';
import knex from '../database/connection';

class PointsRepository {
  async createPoint(point: PointModel, items: number[]) {

    const trx = await knex.transaction();
  
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItems = items.map((item_id: number) => {
      return { 
        item_id,
        point_id
      }
    })
  
    await trx('point_items').insert(pointItems);
    

    if(point_id > 0) {
      trx.commit();
    }

    if(point_id <= 0) {
      return false;
    }    
    return true; 
  }

  async GetById(id: number) {
    const point = await knex('points').where('id',id).first();

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
 
    return {
      point,
      items
    };
  }

  async GetByCityUfItems(city: string, uf: string, items: string) {
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', city)
      .where('uf', uf)
      .distinct()
      .select('points.*');

    return points;
  }
}

export default PointsRepository;