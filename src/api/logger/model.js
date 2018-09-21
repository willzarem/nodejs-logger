import mongoose, { Schema } from 'mongoose'

const loggerSchema = new Schema({
  blob: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

loggerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      blob: this.blob,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Logger', loggerSchema)

export const schema = model.schema
export default model
