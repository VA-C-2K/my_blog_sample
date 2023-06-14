import Head from 'next/head';
import React from 'react'

const CustomHead = (props) => {
    const { title,description,ogDescription,ogImageURL } = props;
  return (
    <Head>
    <title>{title}</title>
    { description && <meta name="description"  content={description} key="desc"/>}
    { ogDescription && <meta property="og:description"  content={ogDescription} />}
    { ogImageURL && <meta property="og:image"  content={ogImageURL} />}
    </Head>
  )
}

export default CustomHead;