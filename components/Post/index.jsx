import React from 'react';
import cl from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../../lib/client';
import Title from '../Title';

import styles from './index.module.scss';
import { useRouter } from 'next/router';

const Post = ({
    className,
    image,
    title,
    description,
    slug
}) => {

  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/post/${encodeURIComponent(slug.current)}`)
  }

  return (
    <Link
      href={`/post/${encodeURIComponent(slug.current)}`}
      className={cl(className, styles.post)}
    >
        <a  onClick={handleClick} className={styles.postLink}>
          <Title
            type="small"
            className={styles.postTitle}
          >
            {title}
          </Title>
          <div className={styles.postContent}>
            <div className={styles.postImage}>
              <Image
                src={urlFor(image).url()}
                alt={image.caption}
                width="100"
                height="100"
              />
            </div>
            <p
              className={styles.postDescription}
            >
              {description}
            </p>
          </div>
        </a>
    </Link>
  )
}

export default Post;