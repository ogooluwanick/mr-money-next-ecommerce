import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../lib/db';

const handler = async (req, res) => {
        const {paymentResult}=req.body
        const session = await getSession({ req });
        if (!session) {
                return res.status(401).send('Error: signin required');
        }

        await db.connect();
        const order = await Order.findById(req.query.id);

        if (order) {
                if (order.isPaid) {
                        return res.status(400).send({ message: 'Error: order is already paid' });
                }

                order.isPaid = true;
                order.paidAt = Date.now();

                if (order.paymentMethod== "paypal"){
                        order.paymentResult= {                                                                          //data being sent in from paypal
                                id:paymentResult.id,                                                              
                                status:paymentResult.status,
                                update_time:paymentResult.update_time,
                                email_address:paymentResult.email_address
                        }
                }
                else if(order.paymentMethod=== "paystack"){
                        console.log("paymentResult.status",paymentResult.status)
                        order.paymentResult= {                                                                          //data being sent in from paystack
                                reference:paymentResult.reference,                                                              
                                status:paymentResult.status,
                                transaction:paymentResult.transaction,
                                message:paymentResult.message,
                        }
                        console.log("order.paymentResult.reference",order.paymentResult.reference)
                }
                else{
                        order.paymentResult= {                                                                          //data being sent in from paystack
                                staff:paymentResult.staff,  
                                staffID:paymentResult.staffID,  
                                status:paymentResult.status,   
                        }
                }

                const paidOrder = await order.save();
                await db.disconnect();
                res.send({ message: 'order paid successfully', order: paidOrder });
        } 
        else {
                await db.disconnect();
                res.status(404).send({ message: 'Error: order not found' });
        }
};

export default handler;