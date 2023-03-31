import axios from 'axios'
import { authenticated } from '../../helpers/auth'

const ProfileImage = ({ userId, getUser, user, setUserError }) => {

  // ! Executions
  const handleUpload = async (e) => {
    // Cloudinary variables
    const cloudName = 'dpulji3ct'
    const uploadPreset = 'h93sq9d7'

    // Data
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    for (const entry of formData.entries()){
      console.log(entry)
    }

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      await authenticated.put(`/api/users/${userId}/profile`, { image: data.secure_url })
      getUser()
    } catch (err) {
      console.log(err)
      setUserError(err.message)
    }
  }

  return (
    <div className="field profile-image-container">
      {user.image ? 
        <>
          <img className='profile-image' src={user.image} /> 
          <input type="file" onChange={handleUpload}/>
        </>
        :
        <>
          <p className='upload'>Please upload a profile image.</p> 
          <input type="file" onChange={handleUpload}/>
        </>
      }
    </div>
  )

}

export default ProfileImage