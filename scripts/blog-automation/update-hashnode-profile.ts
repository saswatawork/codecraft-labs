import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

interface ProfileUpdate {
  name?: string;
  tagline?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  availableFor?: string;
}

async function updateHashnodeProfile(updates: ProfileUpdate) {
  const mutation = `
    mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
      updateUserProfile(input: $input) {
        user {
          id
          username
          name
          tagline
          bio {
            markdown
          }
          location
          socialMediaLinks {
            website
            github
            twitter
            linkedin
          }
          availableFor
        }
      }
    }
  `;

  const input: any = {};

  if (updates.name) input.name = updates.name;
  if (updates.tagline) input.tagline = updates.tagline;
  // Skip bio for now - not in API
  if (updates.location) input.location = updates.location;
  if (updates.availableFor) input.availableFor = updates.availableFor;

  if (updates.website || updates.github || updates.twitter || updates.linkedin) {
    input.socialMediaLinks = {
      ...(updates.website && { website: updates.website }),
      ...(updates.github && { github: updates.github }),
      ...(updates.twitter && { twitter: updates.twitter }),
      ...(updates.linkedin && { linkedin: updates.linkedin }),
    };
  }

  try {
    const response = await axios.post(
      'https://gql.hashnode.com',
      {
        query: mutation,
        variables: { input },
      },
      {
        headers: {
          Authorization: process.env['HASHNODE_API_KEY'],
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.errors) {
      console.error('❌ Error:', JSON.stringify(response.data.errors, null, 2));
      return;
    }

    console.log('✅ Profile updated successfully!\n');
    console.log(JSON.stringify(response.data.data.updateUserProfile.user, null, 2));
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Suggested profile based on your project
const suggestedProfile: ProfileUpdate = {
  tagline: 'Full-stack developer sharing real-world tech stack decisions',
  bio: `Building modern web applications with React 19, Next.js 16, and TypeScript. 

Sharing my journey through tech stack decisions, performance optimizations, and production-ready architectures.

Currently working on a monorepo setup with Turborepo, exploring bleeding-edge tools like React Compiler, Biome, and Vitest.

Writing about: React, Next.js, TypeScript, Performance, DX, Monorepos`,
  location: 'India',
  website: 'https://saswata.hashnode.dev',
  github: 'https://github.com/saswatawork',
  linkedin: 'https://www.linkedin.com/in/saswata-pal/',
  availableFor: 'Technical writing, consulting on React/Next.js projects',
};

// Run with suggested profile
console.log('📝 Suggested profile updates:');
console.log(JSON.stringify(suggestedProfile, null, 2));
console.log('\n🚀 Updating profile...\n');

updateHashnodeProfile(suggestedProfile);
