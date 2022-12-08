import db from "../../../lib/db";
import Product from "../../../models/Product";

const handler = async (req, res) => {
        
        await db.connect();
        const product = await Product.findById (req.query._id);
        await db.disconnect();
        
        res.send(product);
};

export default handler;