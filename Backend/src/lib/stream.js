
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();


const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error("Stream API key or Secret is missing. Please check your .env file.");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) =>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData
    }catch(error){
        console.error("Error upserting Stream user: ",error);
    }
}

export const generateStreamToken = (userId) => {
    try{
        //ensure userId is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    }catch(error){
        console.error("Error generatig Stream token: ",error);
    }
};