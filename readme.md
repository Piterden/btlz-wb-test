# Тестовое задание

## Инструкция

Клонируйте репозиторий.

```sh
$ git clone git@github.com:Piterden/btlz-wb-test.git
```

Создайте .env файл.

```sh
$ cp example.env .env
```

В нём нужно указать токен для доступа к API Wildberries (`WB_API_TOKEN`). Также, в файле .env можно менять адрес получения данных (`WB_API_URL`) и настраивать частоту обновления даннах по cron (`CRON_UPDATE_TIME`) и название листа для записи данных в гугл-таблицах (`GOOGLE_SHEET_NAME`).

Создайте credentials типа JSON в консоли Google и поместите полученный файл в корень проекта под названием `credentials.json`. При необходимости можно поменять ему путь (`GOOGLE_CREDENTIALS_PATH`), не забыв при этом исправить .gitignore, а также проброс самого файла в качестве volume в контейнер `app` в файле compose.yaml.

## Добавление таблиц Google

Добавить таблицы можно через сидер src/postgres/seeds/spreadsheets.js или через консольную команду, запускаемую из контейнера.

```sh
$ docker exec -it app /bin/sh              
/app # npm run spreadsheets help

> btlz-test@1.0.0 spreadsheets
> node dist/utils/spreadsheets.command.js help

Usage: spreadsheets [options] [command]

CLI spreadsheets manager.

Options:
  -h, --help              display help for command

Commands:
  list|ls                 get all spreadsheets
  add|create <id> [name]  add spreadsheet to DB
  remove|delete <id>      remove spreadsheet from DB
  help [command]          display help for command
```

Стоит помнить, что у добавленной таблицы должен быть разрешен доступ для редактирования тем email, который вам выдал гугл внутри JSON файла credentials `client_email`!

## Запуск

```sh
$ docker compose up --build
```
