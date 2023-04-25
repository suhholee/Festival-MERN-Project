import mongoose from 'mongoose'
import 'dotenv/config'

// Models
import Stage from '../models/stages.js'
import Artist from '../models/artists.js'
import User from '../models/users.js'

// Data
import stageData from './data/stages.js'
import artistData from './data/artists.js'
import userData from './data/users.js'

const seedDatabase = async () => {
  try {
    // 1. Connect to the server and database
    await mongoose.connect(process.env.MONGO_URI)
    console.log('🚀 Database connection established')

    // 2. Drop database
    await Promise.all(Object.values(mongoose.connection.collections).map(async collection => await collection.deleteMany()))
    console.log('❌ Database dropped')
    
    // 3. Create dummy user data
    await User.create(userData)

    // 4. Create stage data
    const createdStages = await Stage.create(stageData)

    // 5. Create artist data with stage id
    const artistsWithStage = artistData.map(artist => {
      const stageId = createdStages.find(stage => stage.name === artist.stage)._id
      return { ...artist, stage: stageId }
    })
    const createdArtists = await Artist.create(artistsWithStage)
    console.log(`🎶 ${createdArtists.length} artists and ${createdStages.length} stages added`)

    // 6. Close connection with the server
    await mongoose.connection.close()
    console.log('👋 Connection closed')

  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
  }
}

seedDatabase()