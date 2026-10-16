"use client"

import React from "react"
import { Check, Copy } from "lucide-react"

interface MarkdownContentProps {
  content: string
  className?: string
}

/**
 * Parses inline formatting:
 * - **bold** -> <strong>
 * - *italic* -> <em>
 * - `inline code` -> <code>
 * - [anchor](url) -> <a>
 */
function parseInline(text: string): React.ReactNode {
  // Regex to match inline tokens
  // 1. **bold**
  // 2. `code`
  // 3. *italic*
  // 4. [text](url)
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(tokenRegex)

  return parts.map((part, index) => {
    if (!part) return null

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const boldText = part.slice(2, -2)
      return (
        <strong key={index} className="text-white font-bold tracking-wide">
          {boldText}
        </strong>
      )
    }

    // Inline Code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const codeText = part.slice(1, -1)
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-[#161616] text-[#22F23A] font-mono text-sm border border-[#222222]"
        >
          {codeText}
        </code>
      )
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const italicText = part.slice(1, -1)
      return (
        <em key={index} className="text-gray-200 italic">
          {italicText}
        </em>
      )
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, url] = linkMatch
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#22F23A] underline decoration-[#22F23A]/40 hover:decoration-[#22F23A] transition-colors font-medium"
        >
          {label}
        </a>
      )
    }

    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111111] border-b border-[#1A1A1A] text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 uppercase tracking-wider text-gray-400 text-[11px]">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-gray-300 hover:text-white transition text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#22F23A]" />
              <span className="text-[#22F23A]">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar código</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-green-400 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  // Normalize line breaks
  const normalized = content.replace(/\r\n/g, "\n").trim()
  const blocks = normalized.split(/\n\n+/)

  return (
    <div className={`space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed ${className}`}>
      {blocks.map((block, blockIndex) => {
        const trimmed = block.trim()

        // 1. Headers H2 (## )
        if (trimmed.startsWith("## ")) {
          const text = trimmed.replace(/^##\s+/, "")
          return (
            <h2
              key={blockIndex}
              className="text-2xl sm:text-3xl font-black text-white font-display pt-6 pb-2 border-b border-[#1A1A1A] tracking-tight"
            >
              {parseInline(text)}
            </h2>
          )
        }

        // 2. Headers H3 (### )
        if (trimmed.startsWith("### ")) {
          const text = trimmed.replace(/^###\s+/, "")
          return (
            <h3
              key={blockIndex}
              className="text-xl sm:text-2xl font-bold text-[#22F23A] font-display pt-4 tracking-tight"
            >
              {parseInline(text)}
            </h3>
          )
        }

        // 3. Blockquotes (> )
        if (trimmed.startsWith("> ")) {
          const text = trimmed.replace(/^>\s*/gm, "")
          return (
            <blockquote
              key={blockIndex}
              className="relative p-5 my-6 rounded-2xl bg-[#111111]/90 border-l-4 border-l-[#22F23A] border-y border-r border-[#1A1A1A] text-gray-200 italic font-medium leading-relaxed shadow-lg"
            >
              <div className="absolute top-2 right-4 text-4xl text-[#22F23A]/10 font-serif select-none pointer-events-none">
                “
              </div>
              {parseInline(text)}
            </blockquote>
          )
        }

        // 4. Code Blocks (```lang ... ```)
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n")
          const firstLine = lines[0]
          const language = firstLine.replace(/^```/, "").trim() || "typescript"
          const codeLines = lines.slice(1, lines[lines.length - 1].startsWith("```") ? -1 : undefined)
          const code = codeLines.join("\n")

          return <CodeBlock key={blockIndex} code={code} language={language} />
        }

        // 5. Unordered List (- or * )
        if (trimmed.split("\n").every((line) => /^\s*[-*]\s+/.test(line))) {
          const items = trimmed.split("\n").map((line) => line.replace(/^\s*[-*]\s+/, ""))
          return (
            <ul key={blockIndex} className="my-4 space-y-2.5 pl-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22F23A] mt-2.5 shrink-0" />
                  <span>{parseInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }

        // 6. Ordered List (1. 2. 3.)
        if (trimmed.split("\n").every((line) => /^\s*\d+\.\s+/.test(line))) {
          const items = trimmed.split("\n").map((line) => {
            const numMatch = line.match(/^\s*(\d+)\.\s+(.*)/)
            return {
              num: numMatch ? numMatch[1] : "",
              text: numMatch ? numMatch[2] : line,
            }
          })
          return (
            <ol key={blockIndex} className="my-4 space-y-3 pl-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#161616] border border-[#22F23A]/40 text-[#22F23A] font-mono text-xs font-bold shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="flex-1">{parseInline(item.text)}</div>
                </li>
              ))}
            </ol>
          )
        }

        // 7. Regular Paragraph
        return (
          <p key={blockIndex} className="text-gray-300 leading-relaxed">
            {parseInline(trimmed)}
          </p>
        )
      })}
    </div>
  )
}
