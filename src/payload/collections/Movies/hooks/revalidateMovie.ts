import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Movie } from '@/payload-types'

export const revalidateMovie: CollectionAfterChangeHook<Movie> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/video/${doc.id}`

    payload.logger.info(`Revalidating movie at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/video/${previousDoc.id}`

    payload.logger.info(`Revalidating old movie at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}