import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
//        { _id: {String},}
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [
                {
                        name: { type: String, required: true },
                        qty: { type: Number, required: true },
                        image: { type: String, required: true },
                        price: { type: Number, required: true },
                        slug:{ type: String, required: true },
                },
        ],
        shippingAddress: {
                fullName: { type: String, required: true },
                phone: { type: Number, required: true },
                address: { type: String, required: true },
                city: { type: String, required: true },
                postcode: { type: String, required: true },
                country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentResult:    { 
                id:String,
                reference:String,
                status:String,
                update_time:String,
                email:String,
                transaction:String,
                message:String,
                staff:String,
                staffID:String
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true, default: false },
        isDelivered: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;