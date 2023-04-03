set up enviroment
py -m venv env
pip install requirements.txt
py manage.py migrate
py manage.py runserver
to see dosc localhost:8000/docs
