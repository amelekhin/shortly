# Shortly

A small URL shortening service. Demo: [shortly.deno.dev](https://shortly.deno.dev).

## Endpoints

### `POST /api/v1/link/encode`

Params:

```typescript
type EncodeRequest = {
  /**
   * An original URL that needs to be shortened.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  originalURL: string;
};
```

Response:

```typescript
type EncodeResponse = {
  /**
   * An original URL.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  originalURL: string;

  /**
   * An shortened URL that redirects to the originalURL.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  shortURL: string;
};
```

Error codes:

- `MISSING_ORIGINAL_URL` - no original URL is provided
- `INVALID_ORIGINAL_URL` - the provided URL is not compliant with the URL spec

### `GET /api/v1/link/decode`

Params:

```typescript
type DecodeParams = {
  /**
   * An shortened URL that redirects to the originalURL.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  shortURL: string;
};
```

Response:

```typescript
type EncodeResponse = {
  /**
   * An original URL.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  originalURL: string;

  /**
   * An shortened URL that redirects to the originalURL.
   * Must be compliant with the URL spec.
   *
   * @link https://url.spec.whatwg.org/
   */
  shortURL: string;
};
```

Error codes:

- `MISSING_SHORT_URL` - no short URL is provided
- `INVALID_SHORT_URL` - the provided URL is not compliant with the URL spec
- `NO_SUCH_SHORT_URL` - the original URL corresponding to the given short URL is not found in the registry
