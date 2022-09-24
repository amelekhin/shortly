export class Link {
  public originalUrl: string;
  public shortUrl: string;

  public constructor(shortOrigin: string, originalUrl: string) {
    this.originalUrl = new URL(originalUrl).toString();
    this.shortUrl = Link.getRandomUrl(shortOrigin);
  }

  private static getRandomUrl(domain: string): string {
    const pathname = Math.random().toString(36).substring(2);

    return new URL(pathname, domain).toString();
  }
}
