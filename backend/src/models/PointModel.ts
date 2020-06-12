class PointModel {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;

  constructor(
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string,
  ){
    this.image = image;
    this.name = name;
    this.email = email;
    this.whatsapp = whatsapp;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.uf = uf;
  }
}

export default PointModel;