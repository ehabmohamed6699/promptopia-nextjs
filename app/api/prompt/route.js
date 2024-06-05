import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import User from "@models/user"

export const GET = async (req) => {
    try {
        await connectToDB()  
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), {status:200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status:500})
    }
}

export const POST = async(req) => {
    try {
        await connectToDB()
        const search = req.nextUrl.searchParams.get("search")
        const searchQuery = {
            $or: [
              { prompt: { $regex: new RegExp(search, 'i') } },
              { tag: search },
            ]
          };

        const matchingUsers = await User.find({ username: { $regex: new RegExp(search, 'i') } });

        const userIds = matchingUsers.map(user => user._id);

        if (userIds.length > 0) {
            searchQuery.$or.push({ creator: { $in: userIds } });
        }
        const prompts = await Prompt.find(searchQuery).populate('creator');
        return new Response(JSON.stringify(prompts), {status:200})
    } catch (error) {
        return new Response(error, {status:500})
    }
}