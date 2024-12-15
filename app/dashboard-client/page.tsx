import Image from 'next/image'

const posts = [
  {
    id: 1,
    title: '7개월전 처음 제작했던 개인 홈페이지 포트폴리오 입니다.',
    href: '#',
    description:
      '처음 제작 했던 만큼 미숙했고 홈페이지의 색깔 변경 이나, 각종 HTML 동영상들이 들어가 있습니다.',
    date: 'Mar 25, 2024',
    datetime: '2021-04-05',
    category: { title: 'First Homepage', href: 'https://hcj-1.vercel.app/' },
    author: {
      name: 'First Homepage',
      role: 'HTML / CSS',
      href: 'https://hcj-1.vercel.app/',
      imageUrl: '/1.png',
    },
  },
  {
    id: 2,
    title:
      '1학기 웹프로그래밍 수업을 들으면서 진행했던 중간고사 평가물 입니다.',
    href: '#',
    description:
      '처음 HTML, CSS 를 배우고 만들었던 결과물이라 미숙했던 부분이 많이 있습니다.',
    date: 'Apr 23, 2021',
    datetime: '2021-04-05',
    category: {
      title: 'Middle Test Homepage',
      href: 'https://realfinal.vercel.app/index.html',
    },
    author: {
      name: 'Middle Test Homepage',
      role: 'HTML / CSS',
      href: 'https://realfinal.vercel.app/index.html',
      imageUrl: '/2.png',
    },
  },
  {
    id: 3,
    title: '세계 정보 박람회 킨텍스에 방문 했을때의 모습입니다.',
    href: '#',
    description:
      '세계보안 엑스포에 참가하여 많은 것을 보고 느꼈습니다. 전에도 킨텍스에 몇 번 와본 적이 있지만 이러한 전공 관련 특별한 경험은 처음입니다. 수많은 부스들이 즐비해 있으며 눈에 많이 들어온 것들은 소프트웨어 보안 관련 부스들 이었습니다.',
    date: 'Mar 22, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'World Information Fair',
      href: 'https://realfinal.vercel.app/World%20Security%20Expo.html',
    },
    author: {
      name: 'World Information Fair',
      role: 'Picture',
      href: 'https://realfinal.vercel.app/World%20Security%20Expo.html',
      imageUrl: '/3.png',
    },
  },
  {
    id: 4,
    title:
      '이 웹사이트는 팀원들과 함께 제작한 HTML과 CSS를 소개하는 사이트입니다.',
    href: '#',
    description:
      '팀원들과 한 페이지 한 페이지 제작 하였고 HTML과 CSS를 배우고 이에 도움이 되는 많은 것들이 담긴 사이트 입니다.',
    date: 'Jun 18, 2024',
    datetime: '2021-04-05',
    category: { title: 'Team Project', href: 'https://webp-main.vercel.app/' },
    author: {
      name: 'Team Project',
      role: 'HTML / CSS',
      href: 'https://webp-main.vercel.app/',
      imageUrl: '/4.png',
    },
  },
  {
    id: 5,
    title:
      '이 웹사이트는 1학기 기말고사에 제작한 홈페이지 입니다. 무신사 쇼핑몰들의 제품들에 대한 내용이 나와있습니다.',
    href: '#',
    description:
      '확실히 많은 부분들이 성장하였고, 비록 실제로 물건을 주문하지는 못하는 사이트 이지만 그래도 처음으로 쇼핑몰을 따라 했다는 것에 많은 것들을 느낄 수 있었습니다. 랜덤하게 인플루언서들의 사진들을 볼 수 있고, 배경색 바꾸기, 사진 숨기기 기능들을 사용할 수 있습니다.',
    date: 'Jun 19, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Shopping website',
      href: 'https://last-projext.vercel.app/index.html',
    },
    author: {
      name: 'Shopping website',
      role: 'HTML / CSS',
      href: 'https://last-projext.vercel.app/index.html',
      imageUrl: '/5.png',
    },
  },
  {
    id: 6,
    title: '웹 보안 프로그래밍 2학기에서의 첫번째 js를 이용한 프로젝트 입니다.',
    href: '#',
    description: '현재 진행형이며 다양한 js 기능들을 배우고 있는 중입니다.',
    date: 'Oct 15, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Next Js',
      href: 'https://github.com/parkdaihee/clerk-api',
    },
    author: {
      name: 'First Next Js Website',
      role: 'Next Js',
      href: 'https://github.com/parkdaihee/clerk-api',
      imageUrl: '/6.png',
    },
  },

  {
    id: 7,
    title:
      '2학년 2학기 첫 프로젝트 입니다. api에 대해서 처음 으로 배운 과정 입니다.',
    href: '#',
    description:
      '처음 api를 접해본 만큼 어려운 부분도 많았지만 배운점도 정말 많았습니다.',
    date: 'Oct 25, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Next Js',
      href: 'https://park-api.vercel.app/',
    },
    author: {
      name: 'First Next Js Website',
      role: 'Next Js',
      href: 'https://park-api.vercel.app/',
      imageUrl: '/7.png',
    },
  },

  {
    id: 8,
    title: '2학년 2학기 중간고사 프로젝트 입니다.',
    href: '#',
    description:
      '중간고사 프로젝트로 나에 소개 포트폴리오 등이 포함 되어 있습니다.',
    date: 'Oct 25, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Next Js',
      href: 'https://clerk-api-beige.vercel.app/',
    },
    author: {
      name: 'First Next Js Website',
      role: 'Next Js',
      href: 'https://clerk-api-beige.vercel.app/',
      imageUrl: '/8.png',
    },
  },
  {
    id: 9,
    title: 'api에 대한 2번째 프로젝트 입니다.',
    href: '#',
    description:
      '확실히 2번째인 만큼 더 많은 것을 배웠고 어느정도 api에 익숙해질수 있었습니다.',
    date: 'Dec 2, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Next Js',
      href: 'https://crud-ohjyuku43-parkdaihees-projects.vercel.app/',
    },
    author: {
      name: 'First Next Js Website',
      role: 'Next Js',
      href: 'https://crud-ohjyuku43-parkdaihees-projects.vercel.app/',
      imageUrl: '/9.png',
    },
  },

  {
    id: 10,
    title: '기말고사 팀프로젝트 입니다.',
    href: '#',
    description: '팀원들과 제작한 중고거래 플랫폼 사이트 입니다.',
    date: 'Dec 2, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Next Js',
      href: 'https://finalteam.vercel.app/',
    },
    author: {
      name: 'First Next Js Website',
      role: 'Next Js',
      href: 'https://finalteam.vercel.app/',
      imageUrl: '/10.png',
    },
  },

  {
    id: 9,
    title: '2학년 2학기 마지막에 제작한 쇼핑몰 사이트 입니다.',
    href: '#',
    description:
      '아마존에서 api를 가져오는게 신기 했고 많은 점들을 배웠습니다.',
    date: 'Dec 2, 2024',
    datetime: '2021-04-05',
    category: {
      title: 'Next Js',
      href: 'https://crud-ohjyuku43-parkdaihees-projects.vercel.app/',
    },
    author: {
      name: 'First Next Js Website',
      role: 'Next Js',
      href: 'https://crud-ohjyuku43-parkdaihees-projects.vercel.app/',
      imageUrl: '/6.png',
    },
  },
]

export default function Portfolio() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Personal Portfolio
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            지금까지 배우고 만들었던 포트폴리오 내용들입니다.
          </p>
        </div>
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='flex max-w-xl flex-col items-start justify-between'
            >
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime={post.datetime} className='text-gray-500'>
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                >
                  {post.category.title}
                </a>
              </div>
              <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                  <a href={post.href}>
                    <span className='absolute inset-0' />
                    {post.title}
                  </a>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                  {post.description}
                </p>
              </div>
              <div className='relative mt-8 flex items-center gap-x-4'>
                <Image
                  alt={post.author.name}
                  src={post.author.imageUrl}
                  className='h-10 w-10 rounded-full bg-gray-50'
                  width={40} // 적절한 width 지정
                  height={40} // 적절한 height 지정
                />
                <div className='text-sm leading-6'>
                  <p className='font-semibold text-gray-900'>
                    <a href={post.author.href}>
                      <span className='absolute inset-0' />
                      {post.author.name}
                    </a>
                  </p>
                  <p className='text-gray-600'>{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
