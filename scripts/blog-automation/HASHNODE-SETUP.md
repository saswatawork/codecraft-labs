# Hashnode API Setup Guide

## Step 1: Get Your Hashnode API Key

1. Go to https://hashnode.com/settings/developer
2. Click "Generate New Token"
3. Copy the API key
4. Add to `.env`:
   ```
   HASHNODE_API_KEY=your_api_key_here
   ```

## Step 2: Get Your Hashnode Username

1. Go to https://hashnode.com/settings
2. Your username is shown at the top (usually @username)
3. Or check your blog URL: `https://yourusername.hashnode.dev`
4. Add to `.env`:
   ```
   HASHNODE_USERNAME=yourusername
   ```

## Step 3: Get Your Publication ID (Optional - try without first)

**Method 1 - From your blog:**
1. Go to your Hashnode blog (e.g., https://yourusername.hashnode.dev)
2. Open browser console (F12)
3. Run this:
   ```javascript
   fetch('https://gql.hashnode.com', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       query: `query Publication($host: String!) {
         publication(host: $host) {
           id
           title
         }
       }`,
       variables: { host: "yourusername.hashnode.dev" }
     })
   }).then(r => r.json()).then(console.log)
   ```
4. Replace `yourusername.hashnode.dev` with your actual blog URL
5. Copy the `id` from the response
6. Add to `.env`:
   ```
   HASHNODE_PUBLICATION_ID=your_publication_id_here
   ```

**Method 2 - Try leaving it empty:**
The API might work with just username and API key. Try without publication ID first.

## Step 4: Test the Connection

```bash
cd scripts/blog-automation
pnpm dev test
```

## Example .env Configuration

```dotenv
HASHNODE_API_KEY=abcd1234efgh5678ijkl9012mnop3456
HASHNODE_PUBLICATION_ID=507f1f77bcf86cd799439011
HASHNODE_USERNAME=saswatawork
```

## Usage

### Publish to Hashnode only:
```bash
pnpm dev publish ../../blog-posts/tech-decisions/01-turborepo-vs-nx-monorepo.md --platforms hashnode
```

### Publish to dev.to and Hashnode:
```bash
pnpm dev publish ../../blog-posts/tech-decisions/01-turborepo-vs-nx-monorepo.md --platforms devto,hashnode
```

### Publish all existing blogs to Hashnode:
```bash
# From scripts/blog-automation directory
pnpm dev publish ../../blog-posts/tech-decisions/01-turborepo-vs-nx-monorepo.md --platforms hashnode
pnpm dev publish ../../blog-posts/tech-decisions/02-pnpm-vs-npm-yarn-bun.md --platforms hashnode
pnpm dev publish ../../blog-posts/tech-decisions/03-biome-vs-eslint-prettier.md --platforms hashnode
pnpm dev publish ../../blog-posts/tech-decisions/04-vitest-vs-jest.md --platforms hashnode
pnpm dev publish ../../blog-posts/tech-decisions/05-react-19-vs-react-18.md --platforms hashnode
```

## Notes

- Hashnode uses GraphQL API (different from dev.to REST API)
- Tags in Hashnode must exist or will be created
- Canonical URLs supported (set original article URL)
- Series/collections need to be created manually first
- Cover images supported via URL
