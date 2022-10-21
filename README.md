# Photo Validation Modal

The frontend for the photo validation project.

![Example](./docs/images/example.png)

## Usage

```html
<!-- Insert to the HEAD of the page -->

<link
  rel="stylesheet"
  type="text/css"
  href="https://d1mr7f3tqdu5xu.cloudfront.net/assets/photo-validation-modal.css"
/>
<script type="module">
  import { validatePhotoFields } from "https://d1mr7f3tqdu5xu.cloudfront.net/assets/photo-validation-modal.js";

  validatePhotoFields({
    // This is a list of HTMLInputElement file upload field IDs
    // that we want to start providing the validation modal to.
    fieldIds: ["some-field-id"],
  });
</script>
```

## Setup

### Requirements

- aws-cli: `^2.7.29`
- node: `^v14.0.0`
- npm: `^8.18.0`

### Development Guide

```sh
npm install
npm run dev
```

This will run a local page running in `http://localhost:5173`, demoing the library.

Note that this is pointing at a local version of the photo validation service. To override this, use `.env.local` to point it to your own service:

```sh
touch .env.local
echo "VITE_PHOTO_VALIDATION_BASE_URL=http://localhost:3000" >> .env.local
```

See [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html) for more info.

## Deployment

Make sure that you have the appropriate [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) stored on your system. The AWS resources are stored under the AWS account `255690681915`. Please use an appropriate IAM user and/or role to allow the deploy to happen.

```sh
# For staging
npm run build:staging
npm run deploy:staging

# For production
npm run build:prod
npm run deploy:prod
```
