FROM python:3.10 as prod

RUN pip install --upgrade pip && pip install poetry
WORKDIR /app
COPY poetry.lock pyproject.toml /app/
RUN poetry config virtualenvs.create false --local && \
    poetry install --no-root --no-interaction --no-ansi --without=dev

VOLUME [ "/beats-data" ]

COPY ./src .

EXPOSE 80
CMD ["/app/scripts/server.sh"]

FROM prod as dev
RUN poetry install --no-root --no-interaction --no-ansi
