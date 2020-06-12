import { Request, Response } from 'express';
import ItemsRepository from '../Reporitories/ItemsRepository';

const repository = new ItemsRepository();

class ItemsController {
  async index(req: Request, res: Response) {
    
    const serializedItems = await repository.GetAll();

    return res.json(serializedItems);
  }
}

export default ItemsController;