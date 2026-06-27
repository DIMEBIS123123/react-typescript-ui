import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import { resolve } from 'path'

const files = await glob('dist/types/**/*.d.ts')

for (const file of files) {
	const filePath = resolve(process.cwd(), file)
	let content = readFileSync(filePath, 'utf8')

	const cleaned = content.replace(
		/import\s+['"][^'"]*\.(css|scss|sass|less)['"];?\n?/g,
		'',
	)

	if (content !== cleaned) {
		writeFileSync(filePath, cleaned, 'utf8')
		console.log(`✅ Очищен: ${file}`)
	}
}

console.log('✨ Готово!')
