import StyleConfig from "./StyleConfig";

export function getDay(date: Date): string {
	const js_date = new Date(date);
	return js_date.getDate().toString();
}

export function getMonth(date: Date): string {
	const js_date = new Date(date);
	return (js_date.getMonth() + 1).toString().padStart(2, "0")
}

export function getFullYear(date: Date): string {
	const js_date = new Date(date);
	return (js_date.getFullYear() % 100).toString();
}

export function getDate(date: Date): string {
	const js_date = new Date(date);
	const day = js_date.getDate();
	const month = js_date.getMonth();
	const year = js_date.getFullYear();

	const monthNames = [
		"января", "февраля", "марта", "апреля", "мая", "июня",
		"июля", "августа", "сентября", "октября", "ноября", "декабря"
	];

	return `${day.toString()} ${monthNames[month]} ${year.toString()}`;
}

/**
 * Функция возвращает отформатированый размер файла
 *
 * @param file_size размер файла
 * @returns string
 */
export function formatSize(file_size: number): string {
	const log = Math.floor(Math.log(file_size) / Math.log(1024));
	const byte = ['Б', 'КБ', 'МБ', 'ГБ'];

	return (file_size / Math.pow(1024, log)).toFixed(2) + ' ' + byte[log];
}

/**
 * Функция сравнивает переданный брекпоинт с шириной экрана
 * возвращает true если ширина экрана <= брекпоинта
 *
 * @param breakpoint_name название брекпоинта
 * @returns string
 */
export function checkScreenWidth(breakpoint_name: string): boolean {
	const breakpoints = StyleConfig.get().siteBreakpoints;

	return screen.width < breakpoints[breakpoint_name];
}
