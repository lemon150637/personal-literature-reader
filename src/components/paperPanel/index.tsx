import React, { useEffect, useState } from "react";
import localforage from "localforage";
import { saveAs } from "file-saver";
import Book from "../../models/Book";

const fields = [
  ["year", "发表年份"], ["journal", "期刊 / 会议"], ["doi", "DOI"],
  ["topics", "研究主题"], ["question", "研究问题"], ["method", "研究方法"],
  ["conclusion", "主要结论"], ["limitations", "局限性"], ["reflection", "个人评价"],
] as const;
type Field = typeof fields[number][0];
type Paper = Record<Field, string>;
const emptyPaper = (): Paper => Object.fromEntries(fields.map(([key]) => [key, ""])) as Paper;
const storage = localforage.createInstance({ name: "personal-literature-reader", storeName: "papers" });

export default function PaperPanel({ book }: { book: Book }) {
  const [paper, setPaper] = useState<Paper>(emptyPaper);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    let active = true;
    setReady(false);
    storage.getItem<Paper>(book.key).then((value) => {
      if (active) { setPaper({ ...emptyPaper(), ...value }); setReady(true); setDirty(false); }
    }).catch(() => { if (active) setMessage("读取失败，请关闭面板后重试。"); });
    return () => { active = false; };
  }, [book.key]);

  const save = async () => {
    setSaving(true);
    try {
      await storage.setItem(book.key, paper);
      setDirty(false);
      setMessage("论文信息与笔记已保存。");
    } catch { setMessage("保存失败，请导出笔记保留当前内容后重试。"); }
    finally { setSaving(false); }
  };
  const exportNotes = () => {
    const text = [`# ${book.name}`, `作者：${book.author || "未填写"}`, ...fields.map(([key, label]) => `## ${label}\n\n${paper[key] || "（未填写）"}`)].join("\n\n");
    const filename = book.name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").slice(0, 100) || "论文";
    saveAs(new Blob([text], { type: "text/markdown;charset=utf-8" }), `${filename}-阅读笔记.md`);
  };
  return (
    <details style={{ marginBottom: 16 }}>
      <summary style={{ cursor: "pointer", padding: "10px 0", fontWeight: 600 }}>论文信息与阅读笔记</summary>
      <p style={{ fontSize: 12, lineHeight: 1.6 }}>笔记保存在当前设备，请单独点击“保存论文笔记”。原版同步和备份不包含此面板的数据，可导出 Markdown 留存。</p>
      {fields.map(([key, label], index) => (
        <label className="edit-dialog-field" key={key}>
          <span className="edit-dialog-label">{label}</span>
          {index < 4 ? (
            <input className="edit-dialog-input" disabled={!ready || saving} value={paper[key]} onChange={(e) => { setPaper({ ...paper, [key]: e.target.value }); setDirty(true); }} />
          ) : (
            <textarea className="edit-dialog-textarea" rows={3} disabled={!ready || saving} value={paper[key]} onChange={(e) => { setPaper({ ...paper, [key]: e.target.value }); setDirty(true); }} />
          )}
        </label>
      ))}
      <div style={{ display: "flex", gap: 12 }}>
        <button type="button" disabled={!ready || saving} onClick={save}>{saving ? "保存中…" : "保存论文笔记"}</button>
        <button type="button" disabled={!ready || saving} onClick={exportNotes}>导出 Markdown</button>
      </div>
      <p role="status" style={{ fontSize: 12, marginTop: 8 }}>{dirty ? "有未保存的论文笔记，请先保存再关闭。" : message}</p>
    </details>
  );
}
