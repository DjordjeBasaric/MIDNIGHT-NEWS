import { createContentAction } from '@/actions/content/create.action';
import { ContentEditor } from '@/components/content/ContentEditor';

export default function NewContentPage() {
  return (
    <section>
      <h1>New Content</h1>
      <ContentEditor onSubmit={createContentAction} />
    </section>
  );
}
