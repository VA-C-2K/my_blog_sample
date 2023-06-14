import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const clientConfig = {
  projectId: 'fgwgz79y',
  dataset: 'production',
}

export const client = sanityClient({
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,
  apiVersion: '2023-06-14',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);