import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import { Image } from '@tiptap/extension-image';
import { useEffect } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './RichTextEditor.module.css';

export default function RichTextEditor({ value = '', onChange, placeholder = 'Type here', minHeight = 140 }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Image,
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editor,
        'data-placeholder': placeholder,
        role: 'textbox',
        'aria-multiline': 'true',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML() && editor.isEmpty) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className={styles.wrap} style={{ minHeight }}>
      <div className={styles.toolbar} role="toolbar" aria-label="Editor toolbar">
        <Btn cmd={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon="italic" label="Italic" />
        <Btn cmd={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon="bold" label="Bold" />
        <Btn cmd={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} icon="underline" label="Underline" />
        <Btn cmd={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} icon="strikethrough" label="Strike" />
        <Btn
          cmd={() => {
            const url = window.prompt('URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive('link')}
          icon="link"
          label="Link"
        />
        <ColorPicker editor={editor} />
        <Btn cmd={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} icon="align-left" label="Align left" />
        <Btn cmd={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} icon="align-center" label="Align center" />
        <Btn cmd={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} icon="align-right" label="Align right" />
        <Btn cmd={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon="list-ol" label="Numbered list" />
        <Btn cmd={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon="list-ul" label="Bullet list" />
        <Btn
          cmd={() => {
            const url = window.prompt('Image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          icon="image"
          label="Insert image"
        />
        <Btn cmd={() => editor.chain().focus().setHorizontalRule().run()} icon="horizontal-rule" label="Divider" />
        <Btn cmd={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} icon="clear-format" label="Clear formatting" />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function Btn({ cmd, active, icon, label }) {
  return (
    <button
      type="button"
      onClick={cmd}
      aria-label={label}
      aria-pressed={!!active}
      className={[styles.btn, active && styles.btnActive].filter(Boolean).join(' ')}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}

function ColorPicker({ editor }) {
  return (
    <label className={styles.btn} aria-label="Text color">
      <Icon name="palette" size={16} />
      <input
        type="color"
        className={styles.colorInput}
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      />
    </label>
  );
}
