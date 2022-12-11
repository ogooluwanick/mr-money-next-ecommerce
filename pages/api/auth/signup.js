import User from '../../../models/User';
import db from '../../../lib/db';
import bcrypt from 'bcryptjs';


const handler = async (req, res) => {
        if( req.method !== "POST"){
                return;
        }

        const {email, password,name,phone }= req.body
        

        if ( !name || !email || !email.includes('@') || !password || password.trim().length < 5 || !phone || phone.trim().length<9) {
                res.status(422).json({message: 'Validation error'});
                console.log("Here")
                return;
        }
            
        await db.connect();
            
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
                res.status(422).json({ message: 'User exists already!' });
                await db.disconnect();
                return;
        }
            
        const newUser = new User({ name, email, phone,  password: bcrypt.hashSync(password), isAdmin: false, isStaff:false });
        const user = await newUser.save();
        
        await db.disconnect();
        
        res.status(201).send({
                message: 'Created user!',
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isStaff:user.isStaff,
        });
}
            
export default handler;