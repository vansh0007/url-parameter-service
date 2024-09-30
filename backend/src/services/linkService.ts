import Url, { IUrl } from '../models/Link';

export class UrlService {
  /**
   * Append parameters to a URL and return the new URL document.
   *
   * @param {string} originalUrl - The original URL
   * @param {Record<string, string>} parameters - The parameters to append to the URL
   * @returns {Promise<IUrl>} - The new URL document
   */
  static async appendParameters(originalUrl: string, parameters: Record<string, string>): Promise<IUrl> {
    const url = new URL(originalUrl);
    
    Object.entries(parameters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const newUrl = url.toString();

    const urlDoc = new Url({
      originalUrl,
      parameters,
      newUrl,
    });

    await urlDoc.save();

    return urlDoc;
  }
  /**
   * Retrieve a list of links from the database.
   *
   * @param {number} [page=1] - The page of links to retrieve
   * @param {number} [limit=10] - The number of links to retrieve per page
   * @returns {Promise<{ links: IUrl[], totalPages: number }>} - An object with the links and the total number of pages
   */
  static async getLinks(page: number = 1, limit: number = 10): Promise<{ links: IUrl[], totalPages: number }> {
    // Calculate skip and limit
    const skip = (page - 1) * limit;
    const totalDocs = await Url.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    const links = await Url.find()
      .sort({ createdAt: -1 }) // Sort the links by creation time in descending order
      .skip(skip) // Skip the specified number of links
      .limit(limit); // Limit the number of links to the specified number

    return { links, totalPages };
  }
}