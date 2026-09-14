# AWS Deployment Setup

This project is configured for a static AWS deployment using S3 for origin storage, CloudFront for CDN and HTTPS, and Route 53 for DNS.

## What the GitHub Actions workflow expects

Set these repository variables in GitHub:

- `AWS_REGION` - the AWS region used for the deployment role and S3 bucket.
- `AWS_S3_BUCKET` - the bucket that receives the built `dist/` output.
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` - used for cache invalidation after deploy.
- `PUBLIC_SITE_URL` - the final public domain, for example `https://www.yourdomain.com`.
- `PUBLIC_SITE_BASE` - for a custom domain root, set this to `/`.

Set this GitHub secret in the repository:

- `AWS_ROLE_TO_ASSUME` - the IAM role ARN used by GitHub Actions via OIDC.

## One-time AWS setup

1. Register or confirm the domain in Route 53.
2. Create a hosted zone for the domain.
3. Request an ACM certificate in `us-east-1` for the apex domain and `www`.
4. Create a private S3 bucket for the site content.
5. Create a CloudFront distribution with the S3 bucket as origin.
6. Attach the ACM certificate to CloudFront and set the alternate domain names.
7. Create Route 53 alias records for the apex and optional `www` hostnames.
8. Create an IAM role that GitHub Actions can assume through OIDC.
9. Give that role permission to upload to the S3 bucket and create CloudFront invalidations.
10. Add the GitHub secret and repository variables listed above.

## Suggested bucket and CloudFront settings

- Block all public access on the bucket.
- Use CloudFront Origin Access Control or Origin Access Identity so only CloudFront can read the bucket.
- Configure the default root object as `index.html`.
- Return `404.html` for missing content.
- Keep cache invalidation enabled in the workflow until you have a more advanced cache strategy.

## Notes

- The site is static, so no server runtime is required.
- Forms still need a backend or service endpoint before they can submit anything real.
- If the domain is not yet in Route 53, the same setup still works once the DNS records are added.