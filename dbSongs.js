import mongoose from 'mongoose'

const songsSchema = mongoose.Schema({
    title : String,
    artist : String,
    info1 : String,
    info2 : String,
    info3 : String,
    data : String
})

export default mongoose.model('songsv2', songsSchema)