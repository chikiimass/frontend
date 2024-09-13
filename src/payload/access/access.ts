import { User as UserType } from '@/payload-types'
import { User } from 'payload'
import { AccessArgs } from 'payload'

interface Access {
  args: AccessArgs
  allowedRoles?: UserType['role'][]
  self?: boolean
  selfField?: string
}

export const access = ({ args, allowedRoles, self, selfField }: Access) => {
  const user: User = args.req?.user
  const role = user?.role

  if (role === 'admin') {
    return true
  }

  if (allowedRoles?.includes(role)) {
    return true
  }

  if (self) {
    return {
      [selfField || 'id']: {
        equals: user?.id,
      },
    }
  }

  return false
}