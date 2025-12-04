import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const query = `
query {
  me {
    id
    username
    name
    tagline
    bio {
      markdown
    }
    profilePicture
    socialMediaLinks {
      website
      github
      twitter
      linkedin
      youtube
    }
    location
    availableFor
  }
}
`;

async function getProfile() {
  try {
    const response = await axios.post(
      'https://gql.hashnode.com',
      {
        query,
      },
      {
        headers: {
          Authorization: process.env['HASHNODE_API_KEY'],
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Current Profile:\n');
    console.log(JSON.stringify(response.data.data.me, null, 2));
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
  }
}

getProfile();
