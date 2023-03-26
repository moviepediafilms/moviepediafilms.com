FROM python:3.10 as prod
RUN pip install --upgrade pip && pip install poetry

WORKDIR /app

COPY poetry.lock pyproject.toml /app/
RUN poetry config virtualenvs.create false --local && \
    poetry install --no-root --no-interaction --no-ansi --without=dev

COPY . .

EXPOSE 80
CMD ["/app/run.sh"]

FROM prod as dev
RUN poetry install --no-root --no-interaction --no-ansi