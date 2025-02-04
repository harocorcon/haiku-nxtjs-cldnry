import { ObjectId } from "mongodb";
import HaikuForm from "../../../components/HaikuForm";
import { getCollection } from "../../../lib/db";
import { getUserFromCookie } from "../../../lib/getUser";
import { redirect } from "next/navigation";

async function getDoc(id) {
    const haikusCollection = await getCollection("haikus")
    
    const result = await haikusCollection.findOne({_id: ObjectId.createFromHexString(id)})
    
    return {
        ...result,
        _id: result._id.toString(), // ✅ Convert to string
        author: result.author.toString(),
    }
}

export default async function Page({ params }) {
    const { id } = await params
    const doc = await getDoc(id)

    const user = await getUserFromCookie()

    if(user?.userId !== doc.author.toString()){
        return redirect("/")
    }
    
    return(
        <div>
            <h2 className="text-center text-4xl to-gray-600 mb-7">Edit Post</h2>
            <HaikuForm haiku={doc} action="edit" />
        </div>
    )
}