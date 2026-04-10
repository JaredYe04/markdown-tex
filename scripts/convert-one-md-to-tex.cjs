/**
 * Convert a single Markdown file to LaTeX using dist build.
 * Usage:
 *   node scripts/convert-one-md-to-tex.cjs <input.md> <output.tex>
 */
const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '..')

function main() {
  const input = process.argv[2]
  const output = process.argv[3]
  if (!input || !output) {
    console.error('Usage: node scripts/convert-one-md-to-tex.cjs <input.md> <output.tex>')
    process.exit(1)
  }

  let markdownToLatex
  try {
    markdownToLatex = require(path.join(repoRoot, 'dist', 'index.js')).markdownToLatex
  } catch (e) {
    console.error('Build required. Run: npm run build')
    console.error(e.message)
    process.exit(1)
  }

  const md = fs.readFileSync(path.resolve(repoRoot, input), 'utf8')
  const tex = markdownToLatex(md)
  fs.mkdirSync(path.dirname(path.resolve(repoRoot, output)), { recursive: true })
  fs.writeFileSync(path.resolve(repoRoot, output), tex, 'utf8')
  process.stdout.write(tex)
}

main()

