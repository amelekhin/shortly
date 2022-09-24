export class Link {
  public originalURL: string;
  public shortURL: string;

  public constructor(shortOrigin: string, originalURL: string) {
    this.originalURL = new URL(originalURL).toString();
    this.shortURL = Link.getRandomUrl(shortOrigin);
  }

  private static getRandomUrl(domain: string): string {
    const pathname = Math.random().toString(36).substring(2);

    return new URL(pathname, domain).toString();
  }
}
