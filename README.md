# Wright 2 Transportation

A simple static Astro website for Texas fly ash and dry bulk trucking, with driver recruiting and business inquiries.

## Run

Requires Node 22.12 or newer.

```sh
npm install
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

Deploy the generated `dist/` directory to a static host. Configure the host to serve `404.html` for missing pages.

## AWS deployment

This project includes an AWS deployment workflow at [`.github/workflows/aws-deploy.yml`](.github/workflows/aws-deploy.yml). It builds the site, syncs the static output to S3, and optionally invalidates CloudFront.

The workflow expects GitHub repository variables and one secret. See [docs/aws-deployment.md](docs/aws-deployment.md) for the one-time AWS setup checklist and the exact values to add.

At a minimum, you will need:

- A Route 53 hosted zone for the domain.
- An ACM certificate in `us-east-1`.
- A private S3 bucket.
- A CloudFront distribution.
- An IAM role that GitHub Actions can assume through OIDC.

For a custom domain, set `PUBLIC_SITE_URL` to the real public URL and `PUBLIC_SITE_BASE` to `/`.

## Quick GitHub Pages test

This repo includes a GitHub Pages workflow at [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml). It publishes the built static site on pushes to `main` or `master`, and also supports manual runs from the Actions tab.

For a project-style GitHub Pages site, the workflow sets:

- `PUBLIC_SITE_URL` to the final Pages URL for canonical links and sitemap generation.
- `PUBLIC_SITE_BASE` to the repository name so internal links and assets work under the subpath.

If you want to preview locally with the same settings, run:

```sh
PUBLIC_SITE_URL="https://your-username.github.io/your-repo" PUBLIC_SITE_BASE="/your-repo" npm run build
```

That setup is also a good quick way to verify a small deployment change before moving on to anything larger.

## Company information

Edit `src/data/company.ts` for the supplied logo, contacts, navigation, services, company story, and confirmed driver benefits. Keep unknown information empty. The supplied logo is stored in `public/brand/w2t.png`. No invented fleet photos or company statistics are used.

## Form delivery

Copy `.env.example` to `.env` and configure separate public HTTPS endpoints for driver and transportation forms, then rebuild. These endpoints are visible in the browser and must not contain secrets. Until configured, forms explicitly indicate submissions are unavailable and their submit buttons remain disabled.

Forms send multipart/form-data, including an `inquiryType`, a `website` honeypot, consent, and named fields from `InquiryForm.astro`. A successful HTTP response indicates acceptance; non-success responses display an error without clearing inputs. Requests time out after 30 seconds. Files are optional PDF/Word documents, with a 5 MB client limit per file.

Before enabling delivery, implement server-side validation, request/file size limits, allowed file types, secure storage, rate limiting, honeypot verification, and appropriate CORS. Add any provider-specific spam token through FormData in `src/lib/form-service.ts` and verify it at the endpoint. Browser validation is not a security boundary. Never include submission contents in analytics or application logs. Test real delivery with the selected provider before launch.

## Launch configuration

- Supply verified company and recruiting contact details.
- Set PUBLIC_SITE_URL to enable canonical links and the generated sitemap.
- Connect and test form endpoints.
- Review the draft privacy and terms pages against actual practices before launch.
- Optionally set a real PUBLIC_GA4_MEASUREMENT_ID after deciding applicable analytics/consent practices. Analytics is off by default.

Frontend analytics events are prepared for driver application start/submission, transportation inquiry submission, and tagged recruiting links. No fake measurement IDs or job postings are published.
# Wright2Transportation
