# proj

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

**Full app install**

Clone backend app
```bash
git clone https://github.com/codecats/boxer_app boxer_app
```
Go to cloned app
```bash
cd $_
```
Create virtual enviroment
```bash
virtualenv venv
```
Activate it
```bash
source venv/bin/activate
```
Go to backend content
```bash
cd boxer
```
Install python libs
```bash
pip install -r requirements.txt
```
Now clone frontend app
```bash
git clone https://github.com/codecats/boxer front
```
Go to frontend app
```bash
cd $_
```
Install javascript libs
```bash
bower install
```
Go to backend app
```bash
cd -
```
Collect static files
```bash
./manage.py collectstatic
```
Run server for check if everything is ok.
```bash
./manage.py runserver
```

