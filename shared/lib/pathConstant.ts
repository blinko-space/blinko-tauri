import path from 'path';

const BASE_DIR = process.cwd();

export const UPLOAD_FILE_PATH = path.join(BASE_DIR, '.blinko/files')
export const DBBAKUP_PATH = path.join(BASE_DIR, '.blinko/pgdump')
export const ROOT_PATH = path.join(BASE_DIR, '.blinko')
export const EXPORT_BAKUP_PATH = path.join(BASE_DIR, 'backup')
export const TEMP_PATH = path.join(BASE_DIR, '.blinko/files/temp')
export const VECTOR_PATH = path.join(BASE_DIR, '.blinko/vector')
