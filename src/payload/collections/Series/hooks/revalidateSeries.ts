import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Series } from '@/payload-types'

export const revalidateSeries: CollectionAfterChangeHook<Series> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/info/${doc.slug}`

    payload.logger.info(`Revalidating Series at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/info/${previousDoc.slug}`

    payload.logger.info(`Revalidating old Series at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}