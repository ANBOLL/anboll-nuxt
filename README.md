# NUXT-TEMPLATE

## Начало работы

1. Клонируем/создаём себе проект (projectclone).
2. Создаём .env (если не создан) и прописываем параметры (расшифровка в .env.example)
3. Открываем nginx конфиг этого проекта, удаляем от туда все location-блоки и инклюды (include).
   Вставляем следующее:

```nginx
# Main location
location / {
	# Пример: proxy_pass http://nuxt-template.khokhlov.techart.intranet:7777/;
	proxy_pass         http://{НАЗВАНИЕ ПРОЕКТА}.{ВАШЕ ФАМИЛИЕ ТРАНСЛИТОМ}.techart.intranet:{ПОРТ ЧЕРЕЗ КОТОРЫЙ ПРОБРОШЕН КОНТЕЙНЕР}/;
	proxy_redirect     off;

	proxy_set_header   Host             $host;
	proxy_set_header   X-Real-IP        $remote_addr;
	proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
	proxy_set_header   X-Forwarded-Proto $scheme;

	client_max_body_size       10m;
	client_body_buffer_size    128k;

	proxy_connect_timeout      90;
	proxy_send_timeout         90;
	proxy_read_timeout         90;

	proxy_buffer_size          64k;
	proxy_buffers              4 128k;
	proxy_busy_buffers_size    256k;
	proxy_temp_file_write_size 256k;

	proxy_http_version    1.1;
	proxy_set_header      Upgrade       $http_upgrade;
	proxy_set_header      Connection    "upgrade";
}
```

4. Проверяем наличие `compose` плагина для `docker`:

```bash
docker compose version
```

Если плагина нет - Делаем следующее:

-   Ставим себе официальный репозиторий докера https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository (1 Пункт)

Потом устанавливаем плагин:

```bash
sudo apt install docker-compose-plugin
```

5. В папке с проектом выполняем следующую команду:

```bash
docker compose up -d
```

Эта команда соберёт контейнер и запустит его в фоне

6. Из контейнера запускаем команду запуска dev режима вместе с install:

```bash
# Устанавливаем node пакеты в контейнере
docker exec -it nuxt-{название проекта находится в .env} npm install

# Запускаем dev режим
docker exec -it nuxt-{название проекта находится в .env} npm run dev
```

7. Перезапускаем контейнер с nginx следующей командой:

```bash
docker restart techart_frontend
```

8. Готово, сайт должен быть доступен по доменам, указанным в nginx
   <br/>
   <br/>

## husky

### Что это?

Данный пакет позволяет писать свои git хуки. Но не просто писать, а держать их под гитом.

### Подробнее

Все хуки располагаются в дериктории `.husky`. В случаях, когда каталог с package.json и .git находятся на разных уровнях - требуется изменить команду prepare [https://typicode.github.io/husky/how-to.html#project-not-in-git-root-directory]

Формат хуков аналогичен таковому в обычном гите. В каталоге `.husky` нужно создать исполняемый файл с название хука, после чего внутри него можно писать код на любом удобном языке.

## lint-staged

### Что это?

Данный пакет нужен для анализа отправляемых в рамках комита файлов и обхода их требуемыми линтерами и прочими программами.

### Подробнее

Основным файлом для настройки является `.lintstagedrc`. В формате json в нём перечисляются форматы файлов и требуемые для них обработчики.

По факту данный пакет делает работу и настройку линтеров более прозрачной и удобной. Вместо написания кода в `nuxt.config.ts` или любого другого аналога - мы можем просто в одном файле указать какие файлы кто будет обрабатывать.

Пример файла настроек `.lintstagedrc`:

```json
{
	"*.{ts,js}": "eslint",
	"*.md": "prettier --list-different"
}
```

Тут мы наглядно видим, что все файлы формата `ts` или `js` будут обрабатываться пакетом `eslint`, в то время как файлы формата `md` будет обрабатывать `prettier` со специальным флагом.

Запуск данного пакета выполняется командой `npx lint-staged` или же `npm run lint-staged`, при добавлении соответствующей команды в `package.json`.
