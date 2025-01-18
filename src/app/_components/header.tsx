import Image from 'next/image';
import Link from 'next/link';

interface NavigationItem {
  title: string;
  link: string;
}

const navigations: NavigationItem[] = [
  {
    title: 'Chatbot',
    link: '/chatbot'
  },
  {
    title: 'Activity Log',
    link: '/activity-log'
  },
  {
    title: 'Proof Of Concept',
    link: '/poc'
  }

];

export const Header = () => {
  return (
    <header className='sticky top-0 backdrop-blur-sm z-50'>
      <div className='p-4 border border-black'>
        <div className='container border border-black px-4 py-2 flex justify-between items-center gap-4'>
          <div className='flex gap-4 items-center'>
            <Image
              src={'https://picsum.photos/40'}
              width={40}
              height={40}
              alt='app logo'
            />

            <Link href={'/'} className='underline'>App Name</Link>
          </div>

          <div className='flex gap-4'>
            {navigations.map((navigation, index) => {
              return (
                <Link key={index} href={navigation.link} className='underline'>
                  {navigation.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
