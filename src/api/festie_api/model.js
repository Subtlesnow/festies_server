import mongoose, { Schema } from 'mongoose'

const festieApiSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  id: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  full_name: {
    type: String
  },
  password: {
    type: String
  },
  event_loc: {
    type: String
  }
}, {
  timestamps: true
})

festieApiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      id: this.id,
      email: this.email,
      username: this.username,
      full_name: this.full_name,
      password: this.password,
      event_loc: this.event_loc,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('FestieApi', festieApiSchema)

export const schema = model.schema
export default model
