import Link from 'next/link'

interface RepoProps {
  name: string
}

// GitHub API 응답의 내용을 정의
interface Content {
  path: string
  type: 'file' | 'dir' // 가능한 타입 정의
}

const RepoDirs: React.FC<RepoProps> = async ({ name }) => {
  const username = 'bradtraversy'
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}/contents`
  )
  const contents: Content[] = await response.json() // 구체적인 타입 사용
  const dirs = contents.filter((content) => content.type === 'dir')

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold">Directories</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link
              className="underline"
              href={`https://github.com/${username}/${name}/tree/master/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepoDirs
