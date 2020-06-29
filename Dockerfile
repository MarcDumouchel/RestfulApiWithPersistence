FROM postgres:9.4
ENV POSTGRES_PASSWORD 123
ENV POSTGRES_DB students
ENV POSTGRES_USER students_app
ADD setup.sql /docker-entrypoint-initdb.d
EXPOSE 5432