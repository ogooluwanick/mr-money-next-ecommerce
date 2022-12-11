import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../lib/db';

const handler = async (req, res) => {
        const session = await getSession({ req });
        if (!session) {
                return res.status(401).send('signin required');
        }

        let id=req.query.id
        await db.connect();
                const order = await Order.findById(req.query.id);
        await db.disconnect();

        if (order){
                res.send(order);
        }
        else{
                res.status(401)
                throw new Error("This order is not found")
        }
};

export default handler;