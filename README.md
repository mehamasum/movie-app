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

Approach:

I divided the requirments into two parts:  
a) Dummy Login and OMDb search part  
b) Saving to profile part  

The whole app is wrapped inside a Context provider that passes whether the user is authenticated or not.  
Routes that are private (i.e. Homepage), use this information to redirect user to login page.  
Login page is a public route, here the user logs in. The Context gets updated and now when he is redirected back to the private route, he has access to it.  
Homepage acts as the container between the search box and movie lists. It debounces the input of search fields and calls OMDb.
Upon invocation of modal, another OMDb call is made to fetch movie details.
