import axios from 'axios'

const ImageUploadField = ({ formdata, setFormdata }) => {
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
      // API
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      setFormdata({ ...formdata, profileImage: data.secure_url })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="field">
      <h2>Profile Image</h2>
      { formdata.profileImage ? 
        <img src={formdata.profileImage} /> 
        : 
        <input type="file" onChange={handleUpload}/>}
    </div>
  )

}

export default ImageUploadField