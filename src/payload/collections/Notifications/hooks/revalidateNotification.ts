import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Notification } from '@/payload-types'

export const revalidateNotification: CollectionAfterChangeHook<Notification> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/${doc.id}`

    payload.logger.info(`Revalidating notification at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/${previousDoc.id}`

    payload.logger.info(`Revalidating old notification at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}