import { CheckIcon } from '@heroicons/react/20/solid'

type Tier = {
  name: string
  id: string
  href: string
  priceMonthly: string
  description: string
  features: string[]
  featured: boolean
}

const tiers: Tier[] = [
  {
    name: 'Apple Music',
    id: 'tier-hobby',
    href: 'https://music.apple.com/kr/new',
    priceMonthly: '₩8,900',
    description:
      '자신에게 맞는 요금제 선택하기. 무약정으로 부담 없이. 해지는 언제든지.',
    features: [
      '1억 곡의 음악 및 전문가가 엄선한 30,000개 이상의 플레이리스트',
      'Siri에게 간단히 요청하거나 ‘타이핑으로 Siri 사용’을 이용해 모든 노래, 앨범, 플레이리스트 또는 스테이션 재생',
      '약정 없는 무료 체험',
      '광고 없는 스트리밍',
    ],
    featured: false,
  },
  {
    name: 'Netflix',
    id: 'tier-enterprise',
    href: 'https://www.netflix.com/kr/',
    priceMonthly: '₩17,000',
    description:
      'Netflix 프리미엄으로 가족과 함께 4K(UHD) + HDR 화질을 체험해 보세요.',
    features: [
      '4K(UHD) + HDR',
      '4명',
      '4개 디바이스',
      '광고 없음',
      '추가 회원 2명 가능',
      'TV, 컴퓨터, 스마트폰, 태블릿',
    ],
    featured: true,
  },
]

function classNames(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          Subscription
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          OTT service I subscribe to
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        현재 저는 넷플릭스의 다양한 콘텐츠와 애플 뮤직의 풍부한 음악을 즐기며,
        문화와 예술의 향연에 푹 빠져 있습니다. 이 두 플랫폼 덕분에 일상이 더욱
        특별해지고, 다양한 이야기와 멜로디로 영감을 얻고 있습니다.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? 'relative bg-gray-900 shadow-2xl'
                : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                'text-base font-semibold leading-7'
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-bold tracking-tight'
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? 'text-gray-400' : 'text-gray-500',
                  'text-base'
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-6 text-base leading-7'
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm leading-6 sm:mt-10'
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                      'h-6 w-5 flex-none'
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href} // Use the href from the tier object
              target="_blank" // 새 탭에서 열기
              rel="noopener noreferrer" // 보안 강화
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
