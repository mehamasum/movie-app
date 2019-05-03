## Installation

Python 3.6+ and NodeJS 8+ is required.


## Development

```sh
# goto project root
cd YOUR_PROJECT_ROOT_DIRECTORY

# .env contains environment configuration variables
cp .sample.env .env

# setup python virtual environment for project
virtualenv -p python3.6 .venv

# activate virtual environment
source .venv/bin/activate

# install backend dependencies
pip install -r api/requirements.txt

# migrate database with the application models
python api/manage.py migrate

# create an admin user
python api/manage.py createsuperuser

# start the api servers
python api/manage.py runserver

# install frontend (app) dependencies
npm install

# start the app and api servers
npm start
```