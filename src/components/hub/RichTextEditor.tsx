import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "axt-link" } }),
      Placeholder.configure({ placeholder: placeholder ?? "Write your article…" }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] p-6 focus:outline-none font-mono text-sm leading-relaxed",
      },
    },
  });

  // Keep editor in sync if value changes from outside (e.g. loading a draft)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor === null]);

  if (!editor) return null;

  const Btn = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-2 transition-colors bg-transparent border-none cursor-pointer"
      style={{
        color: active ? "var(--axt-gold)" : "var(--axt-text-faint)",
        borderRight: "1px solid var(--axt-divider)",
      }}
    >
      {children}
    </button>
  );

  const setLink = () => {
    const url = window.prompt("URL");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div style={{ border: "1px solid var(--axt-divider)" }}>
      <div className="flex flex-wrap" style={{ borderBottom: "1px solid var(--axt-divider)", background: "var(--axt-obsidian)" }}>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>B</Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>I</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>H2</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>H3</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>• List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>1. List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>" Quote</Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}>{"</>"}</Btn>
        <Btn onClick={setLink} active={editor.isActive("link")}>Link</Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</Btn>
        <Btn onClick={() => editor.chain().focus().undo().run()}>Undo</Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()}>Redo</Btn>
      </div>
      <div style={{ background: "var(--axt-carbon)" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
