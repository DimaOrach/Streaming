import { User } from "../models/user.model.js";

export const authCallback = (req, res, next) => {
    async (req, res) => {
        try {
            const { id, firstName, lastName, imageUrl } = req.body;
    
            const user = await User.findOne({clerkId: id}); //check if user already exist
            if(!user) {
                await User.create({   //signUp
                    clerkId: id,
                    fullName: `${firstName} ${secondName}`,
                    imageUrl
                });
            }
            res.status(200).json({success: true});
        } catch (error) {
            console.log('Error in auth callback', error);
            next(error);
        }
    }
}