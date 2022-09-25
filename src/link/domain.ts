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

  public constructor(shortOrigin: string, originalURL: string) {
    this.originalURL = new URL(originalURL).toString();
    this.shortURL = Link.getRandomUrl(shortOrigin);

    console.log(shortOrigin, originalURL);
  }

  private static getRandomUrl(domain: string): string {
    const pathname = Math.random().toString(36).substring(2);

    console.log(domain, pathname);

    return new URL(pathname, domain).toString();
  }
}
