import data from "../../lib/data"
import db from '../../lib/db';
import User from '../../models/User';
import Banner from '../../models/Banner';
import Product from '../../models/Product';

const handler = async (req, res) => {
  await db.connect();

  await User.deleteMany();
  await User.insertMany(data.users);

  await Product.deleteMany();
  await Product.insertMany(data.products);
  
  await Banner.deleteMany();
  await Banner.insertMany(data.banner);
  
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;