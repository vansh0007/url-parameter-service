import mongoose, { Document, Schema } from 'mongoose';

/**
 * The IUrl interface represents a MongoDB document for a URL.
 * 
 * @property {string} originalUrl - The original URL
 * @property {Record<string, string>} parameters - The URL parameters to append to the original URL
 * @property {string} newUrl - The new URL with the appended parameters
 * @property {Date} createdAt - The date and time when the document was created
 */
export interface IUrl extends Document {
  originalUrl: string;
  parameters: Record<string, string>;
  newUrl: string;
  createdAt: Date;
}


const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  parameters: { type: Schema.Types.Mixed, required: true },
  newUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUrl>('Url', UrlSchema);