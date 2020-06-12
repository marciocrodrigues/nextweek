import { Request, Response } from 'express';
import knex from '../database/connection';
import PointRepository from '../Reporitories/PointsRepository';
import PointModel from '../models/PointModel';

const repository = new PointRepository();

class PointsController {
  async create(req: Request, res: Response) {

    const { 
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;
  
    const point = new PointModel(
      'image-fake', 
      name, 
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city, 
      uf
    );

    const success = await repository.createPoint(point, items);

    return res.json({ success: success });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const point = await repository.GetById(Number(id));

    if (!point) {
      return res.status(400).json({ message: 'Point not found.' });
    }

    return res.json(point);
  }

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const points = await repository.GetByCityUfItems(String(city), String(uf), String(items));

    if(!points){
      return res.status(400).json({ message: 'Point not found.' });
    }

    return res.json(points);

  }
}

export default PointsController;