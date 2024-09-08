import Headers from './Headers';
import SearchInput from '../SearchInput';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import SignInOrProfile  from './SignInOrProfile';

export const dynamic = 'force-static'
export const revalidate = 600

const Header = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const episodes = await payload.find({
      collection: 'series',
      depth: 2,
      limit: 10,
  })

  return (
    <header className="sticky top-0 z-10 flex w-full flex-row items-center justify-between py-4 sm:p-4">
      <Headers />
      <div className="flex items-center space-x-4 lg:flex-grow lg:justify-center">
        <SearchInput data={episodes} />
        <SignInOrProfile />
      </div>
    </header>
  );
};

export default Header;