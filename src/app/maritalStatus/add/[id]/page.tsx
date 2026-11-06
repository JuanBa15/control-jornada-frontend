import { MaritalStatusEditView } from '@/sections/maritalStatus/view'

export const metadata = {
  title: 'Editar estado civil'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <MaritalStatusEditView id={id} />
}
