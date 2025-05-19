import { use } from 'react'
export default function ProfilePage({ params }: any) {
  const param: { id: String } = use(params)

  return (
    <div>
      <h1>Profile Page {param.id}</h1>
    </div>
  )
}
