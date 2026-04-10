/**
 * Convert all .md files under tests/fixtures/md (recursively) to LaTeX under tests/fixtures/md-to-tex,
 * preserving subdirectory structure.
 * Run: npm run convert-md  (builds first, then converts)
 * Or:  node scripts/convert-md-to-tex.cjs  (after npm run build)
 */

const path = require('path')
const fs = require('fs')

const repoRoot = path.join(__dirname, '..')
const inputDir = path.join(repoRoot, 'tests', 'fixtures', 'md')
const outputDir = path.join(repoRoot, 'tests', 'fixtures', 'md-to-tex')

/** Collect paths relative to `root` for every `.md` file under `root`. */
function collectMdFilesRelative(root) {
  const results = []
  function walk(currentAbs, relFromRoot) {
    let entries
    try {
      entries = fs.readdirSync(currentAbs, { withFileTypes: true })
    } catch {
      return
    }
    for (const ent of entries) {
      const name = ent.name
      const rel = relFromRoot ? path.join(relFromRoot, name) : name
      const full = path.join(currentAbs, name)
      if (ent.isDirectory()) {
        walk(full, rel)
      } else if (ent.isFile() && name.toLowerCase().endsWith('.md')) {
        results.push(rel)
      }
    }
  }
  walk(root, '')
  return results
}

function main() {
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true })
    const readme = `# Markdown test files

Put your .md files here (nested subfolders are OK), then run:

  npm run convert-md

Converted LaTeX will be written to tests/fixtures/md-to-tex/ mirroring this folder tree (.tex per .md).
`
    fs.writeFileSync(path.join(inputDir, 'README.md'), readme, 'utf8')
    console.log('Created', inputDir)
    console.log('Add .md files there and run: npm run convert-md')
    return
  }

  let markdownToLatex
  try {
    markdownToLatex = require(path.join(repoRoot, 'dist', 'index.js')).markdownToLatex
  } catch (e) {
    console.error('Build required. Run: npm run build')
    console.error(e.message)
    process.exit(1)
  }

  const relPaths = collectMdFilesRelative(inputDir)
  if (relPaths.length === 0) {
    console.log('No .md files under tests/fixtures/md. Add some and run again.')
    return
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const rel of relPaths) {
    const inputPath = path.join(inputDir, rel)
    const md = fs.readFileSync(inputPath, 'utf8')
    const tex = markdownToLatex(md)
    const outRel = rel.replace(/\.md$/i, '.tex')
    const outPath = path.join(outputDir, outRel)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, tex, 'utf8')
    console.log('Converted', path.relative(repoRoot, inputPath), '->', path.relative(repoRoot, outPath))
  }
  console.log('Done. Output folder:', path.relative(repoRoot, outputDir))
}

main()

