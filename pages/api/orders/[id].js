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
                const order = await Order.findOne({id});
        await db.disconnect();

        res.send(order);
};

export default handler;