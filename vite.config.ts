import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'), // точка входа
			name: 'ReactTypescriptUI', // имя для UMD сборки
			formats: ['es'], // только ESM
			fileName: 'index', // имя выходного файла
		},
		rollupOptions: {
			// Внешние зависимости — не включаем в бандл
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				// Глобальные переменные для UMD (если нужен)
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
})
