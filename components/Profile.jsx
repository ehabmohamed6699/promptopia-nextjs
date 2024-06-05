import PromptCard from "./PromptCard"
import Link from "next/link"


const Profile = ({name, desc, data, handleEdit, handleDelete, personal}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left"><span className="blue_gradient">{name} Profile</span></h1>
      <p className="desc text-left">{desc}</p>
      <div className={`mt-16 ${data?.length > 0?"prompt_layout":""}`}>
        {data?.length > 0 ? data?.map((post)=>(  
          <PromptCard key={post._id} post={post} handleEdit={() => handleEdit && handleEdit(post)} handleDelete={() => handleDelete && handleDelete(post)}/>
        )):personal?<p className="text-center w-full font-inter text-gray-900">You haven't shared any prompts, <Link href={'/create-prompt'}><span className="blue_gradient">create new prompt</span></Link></p>:<p className="text-center w-full font-inter text-gray-900">User has't shared any prompts yet</p>}
      </div>
    </section>
  )
}

export default Profile