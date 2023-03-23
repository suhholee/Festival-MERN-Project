import { sendError } from '../config/errors.js'
import Artist from '../models/artists.js'

// * INDEX route
// Endpoints: /artists
export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find()
    return res.json(artists)
  } catch (err) {
    return sendError(err, res)
  }
}