import User from '../../../models/User';
import db from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { escapeHtml, stripslashes } from '../../../lib/validationFuns';


const handler = async (req, res) => {
        if( req.method !== "POST"){
                return;
        }

        const {email, password,name,phone }= req.body
        let Cname=stripslashes(escapeHtml(name.trim()))
        let Cemail=stripslashes(escapeHtml(email.trim()))
        let Cpassword=escapeHtml(password)
        let Cphone=stripslashes(escapeHtml(phone.replace(/[^0-9]/g, '').trim()))

        if ( !name || !email || !email.includes('@') || !password || password.trim().length < 5 || !phone || phone.trim().length<9) {
                res.status(422).json({message: 'Validation error'});
                console.log("Here")
                return;
        }
            
        await db.connect();
            
        const existingUser = await User.findOne({ email:Cemail  });

        if (existingUser) {
                res.status(422).json({ message: 'User exists already!' });
                await db.disconnect();
                return;
        }
            
        const newUser = new User({ name:Cname, email:Cemail, phone:Cphone,  password: bcrypt.hashSync(Cpassword), isAdmin: false, isStaff:false });
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