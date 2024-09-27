# GOLANG POS

this is a simple POS written in golang as the backend and react on next js as as the frontend

## INSTRUCTIONS TO RUN
On your terminal, change directory to the backend folder and create the admin user
```
cd backend
go run . -username admin -password admin2024
```
change the username and password to your liking

now, to run the backend on other instances, simply run:
```
go run .
```

to run the frontend, first install the node dependencies:
```
npm install
```
then run the frontend:
```
npm run dev
```
this runs the frontend on http://localhost:3000 and the backend on http://localhost:8080