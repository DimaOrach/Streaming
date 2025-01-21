import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, fullname, image } = req.body;

        if (!id || !fullname || !image) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let user = await User.findOne({ clerkId: id });

        if (!user) {
            user = new User({
                clerkId: id,
                fullname,
                image,
            });
            await user.save();
            console.log("New user created:", user);
        } else {
            console.log("User already exists:", user);
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error in auth callback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
