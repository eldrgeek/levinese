#!/usr/bin/env bash
# Safe deploy script — hardcodes the siteId so this can never cross-deploy.
# Always use this instead of bare `netlify deploy --prod`.
set -euo pipefail

SITE_ID="2ab17854-9e22-436b-b916-9f78d1335a54"
SITE_NAME="levinese-preview"

echo "Deploying to $SITE_NAME (siteId: $SITE_ID) ..."
netlify deploy --prod --site="$SITE_ID" --dir=dist "$@"
