import { useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { NewProposalModal } from '@components/dao-dashboard/newproposal'
import Editor from '@components/editor'
import { Card } from '@components/ui/card'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { JSONContent } from '@tiptap/react'

export default function ProposePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<JSONContent>()

  return (
    <Layout title={'Propose'} content="Create a proposal.">
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-10">
          <fieldset className="w-full">
            <legend className="text-lg font-semibold mb-4">Make a Proposal</legend>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder={'Proposal for...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <Editor
                setContent={setContent}
                label="Details"
                description="You can provide context for this proposal here."
              />
              <NewProposalModal proposalProp="menu" content={content} title={title} />
            </div>
          </fieldset>
        </div>
      </Card>
    </Layout>
  )
}
