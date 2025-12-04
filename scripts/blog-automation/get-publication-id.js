// Quick script to get your Hashnode publication ID
import 'dotenv/config';

const query = `
  query Me {
    me {
      publications(first: 10) {
        edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  }
`;

const apiKey = process.env.HASHNODE_API_KEY;

if (!apiKey) {
  console.error('❌ HASHNODE_API_KEY not found in .env');
  process.exit(1);
}

fetch('https://gql.hashnode.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: apiKey,
  },
  body: JSON.stringify({ query }),
})
  .then((r) => r.json())
  .then((data) => {
    if (data.errors) {
      console.error('❌ Error:', data.errors[0].message);
      process.exit(1);
    }

    const publications = data.data.me.publications.edges;

    if (publications.length === 0) {
      console.log('❌ No publications found. Create a blog on Hashnode first.');
      process.exit(1);
    }

    console.log('\n📚 Your Publications:\n');
    publications.forEach((pub, i) => {
      console.log(`${i + 1}. ${pub.node.title}`);
      console.log(`   URL: ${pub.node.url}`);
      console.log(`   ID: ${pub.node.id}`);
      console.log('');
    });

    console.log('✅ Add this to your .env file:');
    console.log(`HASHNODE_PUBLICATION_ID=${publications[0].node.id}`);
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
