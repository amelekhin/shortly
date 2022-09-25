export class Link {
  /**
   * An original URL that needs to be shortened.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  public originalURL: string;

  /**
   * An shortened URL that redirects to the originalURL.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  public shortURL: string;

  /**
   * @param appOrigin - the full domain of the shortly app, including the protocol part
   * @param originalURL - a URL that needs to be shortened, expected to be valid
   */
  public constructor(appOrigin: string, originalURL: string) {
    this.originalURL = new URL(originalURL).toString();
    this.shortURL = Link.getRandomURL(appOrigin);
  }

  /**
   * Check if a string is a valid URL
   *
   * @param url - a URL to validate
   * @returns true if the URL is valid and false otherwise
   */
  public static validateURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate a URL with a random pathname
   *
   * @param domain - the full domain of the shortly app, including the protocol part
   */
  private static getRandomURL(domain: string): string {
    const pathname = Math.random().toString(36).substring(2);

    console.log(domain, pathname);

    return new URL(pathname, domain).toString();
  }
}
