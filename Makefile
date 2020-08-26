COCKROACH = cockroachdb/cockroach:v20.1.4
SQL = docker-compose exec roach1 cockroach sql --insecure

initdb:
	docker-compose exec roach1 cockroach init --insecure || :
	$(SQL) \
		-e 'CREATE DATABASE IF NOT EXISTS iziweb_dev' \
		-e 'CREATE DATABASE IF NOT EXISTS iziweb_test' \
		-e 'CREATE USER IF NOT EXISTS iziweb_dev' \
		-e 'CREATE USER IF NOT EXISTS iziweb_test' \
		-e 'GRANT ALL ON DATABASE iziweb_dev TO iziweb_dev' \
		-e 'GRANT ALL ON DATABASE iziweb_test TO iziweb_test'

dropdb:
	$(SQL) \
		-e 'DROP DATABASE IF EXISTS iziweb_dev' \
		-e 'DROP DATABASE IF EXISTS iziweb_test'

resetdb: dropdb initdb

flushdb:
	$(SQL) \
		-e 'DELETE from iziweb_dev.transactions'
