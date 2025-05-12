
'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type MdxRendererProps = {
  source: MDXRemoteSerializeResult
}

export default function MdxRenderer({ source }: MdxRendererProps) {
  return <MDXRemote {...source} />
}
